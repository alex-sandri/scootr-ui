import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ride-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class RideMenuComponent implements OnInit
{
  @Input("section")
  public section?: string;

  public rideId?: string;

  constructor(private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: params =>
      {
        this.rideId = params.id;
      },
    });
  }
}
