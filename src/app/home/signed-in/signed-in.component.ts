import { AfterViewInit, Component } from '@angular/core';
import * as L from "leaflet";

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

  constructor()
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
      .on("dragend", () =>
      {
        console.log(this.map?.getCenter());
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