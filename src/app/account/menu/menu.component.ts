import { Component, Input } from '@angular/core';

@Component({
  selector: 'account-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class AccountMenuComponent
{
  @Input("section")
  public section?: string;
}
