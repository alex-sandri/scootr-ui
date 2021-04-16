import { Component, Input } from '@angular/core';
import { ISubscription } from 'src/app/services/api/api.service';

@Component({
  selector: 'subscription-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SubscriptionListComponent
{
  @Input()
  public subscriptions?: ISubscription[];
}
