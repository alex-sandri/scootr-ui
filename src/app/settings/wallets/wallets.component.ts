import { Component, OnInit } from '@angular/core';
import { ApiService, IWallet } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit
{
  public wallets?: IWallet[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api.listWalletsForUser(this.auth.user.id);
  }

  public async setDefaultWallet(wallet: IWallet)
  {
    // TODO
  }

  public async removeWallet(wallet: IWallet)
  {
    // TODO
  }
}
