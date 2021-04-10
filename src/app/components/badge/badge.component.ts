import { Component, Input } from '@angular/core';

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent
{
  @Input()
  public text = "";

  constructor()
  {}
}
