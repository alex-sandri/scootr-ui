import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IWallet } from 'src/app/services/api/api.service';

@Component({
  selector: 'wallet-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class WalletMenuComponent implements OnInit
{
  @Input("section")
  public section?: string;

  public wallet?: IWallet;

  constructor(private api: ApiService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params
      .subscribe({
        next: params =>
        {
          this.api
            .retrieveWallet(params.id)
            .then(response =>
            {
              this.wallet = response.data;
            });
        },
      });
  }
}
