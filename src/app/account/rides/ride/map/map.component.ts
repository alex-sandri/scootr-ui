import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-ride-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class RideMapComponent implements OnInit, AfterViewInit
{
  private map?: L.Map;

  // Rome, IT
  public currentLocation: L.LatLngExpression = [ 41.9027835, 12.4963655 ];

  constructor(private api: ApiService)
  {}

  public ngOnInit()
  {}

  public ngAfterViewInit()
  {
    this.map = L
      .map("map", {
        zoom: 19,
        center: this.currentLocation,
      });

    L
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 12,
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      })
      .addTo(this.map);
  }
}
