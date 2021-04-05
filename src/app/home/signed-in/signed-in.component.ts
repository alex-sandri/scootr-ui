import { AfterViewInit, Component } from '@angular/core';
import * as L from "leaflet";
import { ApiService, IVehicle } from 'src/app/services/api/api.service';

@Component({
  selector: 'signed-in-home',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.scss']
})
export class SignedInHomeComponent implements AfterViewInit
{
  private map?: L.Map;
  private markerGroup?: L.LayerGroup;

  public canUseGeolocation = true;
  public hasGrantedGeolocationPermissions = false;

  public vehicles?: IVehicle[];

  constructor(private api: ApiService)
  {}

  public ngAfterViewInit()
  {
    this.initMap();

    this.map?.setView(
      // Rome, IT
      [
        41.9027835,
        12.4963655,
      ],
    );

    this.askForGeolocationPermission();
  }

  private askForGeolocationPermission()
  {
    this.canUseGeolocation = "geolocation" in navigator;

    if (this.canUseGeolocation)
    {
      navigator.geolocation.getCurrentPosition(
        position =>
        {
          this.hasGrantedGeolocationPermissions = true;

          this.map?.setView(
            [
              position.coords.latitude,
              position.coords.longitude,
            ],
          );
        },
        error =>
        {
          if (error.code === error.PERMISSION_DENIED)
          {
            this.hasGrantedGeolocationPermissions = false;
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
        preferCanvas: true,
      })
      .on("dragend", () => this.loadVehicles())
      .on("zoomend", () => this.loadVehicles());

    this.markerGroup = L
      .layerGroup()
      .addTo(this.map);

    L
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 6,
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      })
      .addTo(this.map);
  }

  private async loadVehicles()
  {
    if (!this.map || !this.markerGroup)
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
      // Clear all previous markers to avoid duplicate ones
      this.markerGroup.clearLayers();

      for (const vehicle of response.data)
      {
        let color: string = "white";

        if (vehicle.battery_level > 80)
        {
          color = "green";
        }
        else if (vehicle.battery_level > 30)
        {
          color = "darkorange";
        }
        else
        {
          color = "red";
        }

        L
          .circleMarker(
            [
              vehicle.location.latitude,
              vehicle.location.longitude,
            ],
            {
              color,
              fillOpacity: 1,
            },
          )
          .addTo(this.markerGroup);
      }
    }
  }
}
