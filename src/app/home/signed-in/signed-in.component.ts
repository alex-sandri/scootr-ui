import { AfterViewInit, Component } from '@angular/core';
import * as L from "leaflet";
import "leaflet.markercluster";
import { ApiService, IRide, IVehicle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'signed-in-home',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.scss']
})
export class SignedInHomeComponent implements AfterViewInit
{
  public activeRide: IRide | null = null;

  private vehicles: IVehicle[] = [];

  private map?: L.Map;
  private markers?: L.MarkerClusterGroup;

  // Rome, IT
  public currentLocation: L.LatLngExpression = [ 41.9027835, 12.4963655 ];

  public canUseGeolocation = true;
  public hasGrantedGeolocationPermission = false;

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngAfterViewInit()
  {
    this.initMap();

    this.setMapCenter();

    this.loadVehicles();

    this.askForGeolocationPermission();

    if (!this.auth.user)
    {
      return;
    }

    this.api.retrieveActiveRide(this.auth.user.id).then(response =>
    {
      if (response.data)
      {
        this.activeRide = response.data;
      }
    });
  }

  public setMapCenter(coords?: L.LatLngExpression)
  {
    this.map?.setView(coords ?? this.currentLocation);
  }

  public async searchPlace(query: string)
  {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);

    const body: {
      lat: number,
      lon: number,
    }[] = await response.json();

    this.setMapCenter(
      [
        body[0].lat,
        body[0].lon,
      ],
    );
  }

  private askForGeolocationPermission()
  {
    this.canUseGeolocation = "geolocation" in navigator;

    if (this.canUseGeolocation)
    {
      navigator.geolocation.getCurrentPosition(
        position =>
        {
          this.hasGrantedGeolocationPermission = true;

          this.currentLocation = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          this.setMapCenter();
        },
        error =>
        {
          if (error.code === error.PERMISSION_DENIED)
          {
            this.hasGrantedGeolocationPermission = false;
          }
        },
      );
    }
  }

  private initMap()
  {
    this.map = L
      .map("map", {
        zoom: 19,
        zoomControl: false,
      })
      .on("viewreset", () => this.loadVehicles())
      .on("dragend", () => this.loadVehicles())
      .on("zoomend", () => this.loadVehicles());

    L
      .control
      .zoom({
        position: "bottomleft",
      })
      .addTo(this.map);

    this.markers = L
      .markerClusterGroup()
      .addTo(this.map);

    L
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 12,
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      })
      .addTo(this.map);
  }

  private async loadVehicles()
  {
    if (!this.map || !this.markers)
    {
      return;
    }

    const center = this.map.getCenter();

    const eastBound = this.map.getBounds().getEast();
    const centerEast = L.latLng(center.lat, eastBound);

    const radius = center.distanceTo(centerEast) * 2;

    const response = await this.api.listVehiclesNearLocation(
      {
        latitude: center.lat,
        longitude: center.lng,
      },
      radius,
    );

    if (response.data)
    {
      const newVehicles = response.data.filter(v =>
      {
        return !this.vehicles.find(_ => _.id === v.id);
      });

      this.vehicles = [ ...this.vehicles, ...newVehicles ];

      for (const vehicle of newVehicles)
      {
        this.markers
          .addLayer(
            L
              .marker(
                [
                  vehicle.location.latitude,
                  vehicle.location.longitude,
                ],
                {
                  icon: L.icon({
                    iconUrl: "/assets/vehicles/scooter.png",
                    iconSize: [ 25, 25 ],
                  }),
                },
              )
              .bindPopup(
                L
                  .popup()
                  .setContent(`Livello batteria: ${vehicle.battery_level}%`),
              ),
          );
      }
    }
  }
}
