import { Component, OnInit } from '@angular/core';
import { ApiService, ISubscription } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit
{
  public subscriptions?: {
    active: ISubscription[],
    incomplete: ISubscription[],
    old: ISubscription[],
  };

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api.listSubscriptionsForWallet(this.auth.user.id).then(response =>
    {
      if (response.data)
      {
        this.subscriptions = {
          active: response.data.filter(_ => _.status === "active"),
          /**
           * Incomplete subscriptions are the result of failed payments
           * or payments that require additional steps, such as 3D Secure
           */
          incomplete: response.data.filter(_ => _.status !== "active" && !_.deleted),
          old: response.data.filter(_ => _.deleted),
        };
      }
    });
  }

  public async manageSubscriptions()
  {
    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.createBillingPortalSession(this.auth.user.id);

    if (response.data)
    {
      open(response.data.url, "_blank");
    }
  }
}
