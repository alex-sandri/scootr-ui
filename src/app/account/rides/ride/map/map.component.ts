import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from "leaflet";
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-ride-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class RideMapComponent implements AfterViewInit
{
  private map?: L.Map;

  constructor(private api: ApiService, private route: ActivatedRoute)
  {}

  public ngAfterViewInit()
  {
    this.route.params.subscribe({
      next: async params =>
      {
        if (!this.map)
        {
          this.map = L.map("map");

          L
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              minZoom: 6,
              attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
            })
            .addTo(this.map);
        }

        const response = await this.api.listWaypointsForRide(params.id);

        if (!response.data)
        {
          return;
        }

        const polyline = L
          .polyline(
            response.data.map(_ => [ _.location.latitude, _.location.longitude ]),
            {
              color: "red",
            },
          )
          .addTo(this.map);

        this.map.fitBounds(polyline.getBounds());
      },
    });
  }
}
