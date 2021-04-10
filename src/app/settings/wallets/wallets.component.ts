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

    this.api
      .listWalletsForUser(this.auth.user.id)
      .then(response =>
      {
        this.wallets = response.data;
      });
  }

  public async setDefaultWallet(wallet: IWallet)
  {
    if (!this.auth.user || !this.wallets)
    {
      return;
    }

    const response = await this.api.setDefaultWalletForUser(wallet.id, this.auth.user.id);

    if (!response.errors)
    {
      this.wallets.map(_ =>
      {
        _.is_default = wallet.id === _.id;

        return _;
      });
    }
  }

  public async removeWallet(wallet: IWallet)
  {
    if (!this.wallets)
    {
      return;
    }

    const response = await this.api.deleteWallet(wallet.id);

    if (!response.errors)
    {
      this.wallets = this.wallets.filter(p => p.id !== wallet.id);
    }
  }
}
