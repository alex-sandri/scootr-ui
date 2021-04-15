import { Component, OnInit } from '@angular/core';
import { ApiService, IRide } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit
{
  public rides?: IRide[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api
      .listRidesForUser(this.auth.user.id)
      .then(response =>
      {
        this.rides = response.data;
      });
  }
}
