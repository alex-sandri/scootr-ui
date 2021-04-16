import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-ride-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class RideMapComponent implements OnInit
{
  constructor(private api: ApiService)
  {}

  ngOnInit()
  {}
}
