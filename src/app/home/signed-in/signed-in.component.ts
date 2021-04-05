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

  public canUseGeolocation = true;
  public hasGrantedGeolocationPermissions = false;

  public vehicles?: IVehicle[];

  constructor(private api: ApiService)
  {}

  public ngAfterViewInit()
  {
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
          if (!this.map)
          {
            this.initMap();
          }

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
      .map("map", { zoom: 19 })
      .on("dragend", async () =>
      {
        if (!this.map)
        {
          return;
        }

        const center = this.map.getCenter();

        const response = await this.api.listVehiclesNearLocation(
          {
            latitude: center.lat,
            longitude: center.lng,
          },
          1000,
        );

        if (response.data)
        {
          for (const vehicle of response.data)
          {
            L
              .marker([
                vehicle.location.latitude,
                vehicle.location.longitude,
              ])
              .addTo(this.map);
          }
        }
      });

    L
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 3,
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      })
      .addTo(this.map);
  }
}
