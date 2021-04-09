import { Component, Input } from '@angular/core';

@Component({
  selector: 'settings-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class SettingsMenuComponent
{
  @Input("section")
  public section?: string;
}
