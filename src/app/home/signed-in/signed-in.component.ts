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

  constructor()
  {}

  public ngAfterViewInit()
  {
    this.initMap();
  }

  private initMap()
  {
    this.map = L.map("map", {
      center: [
        41.9027835,
        12.4963655,
      ],
      zoom: 19,
    });

    const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 3,
      attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
    });

    tiles.addTo(this.map);
  }
}
