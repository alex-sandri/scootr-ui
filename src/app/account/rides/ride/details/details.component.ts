import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IRide } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-ride-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class RideDetailsComponent implements OnInit
{
  public ride?: IRide;

  constructor(private api: ApiService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: async params =>
      {
        const response = await this.api.retrieveRide(params.id);

        this.ride = response.data;
      },
    });
  }
}
