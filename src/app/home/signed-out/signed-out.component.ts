import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'signed-out-home',
  templateUrl: './signed-out.component.html',
  styleUrls: ['./signed-out.component.scss']
})
export class SignedOutHomeComponent
{
  public showSpidIdpList = false;

  public env = environment;

  constructor()
  {}

  public onSpidIdpListClick(e: Event)
  {
    if ((e.target as HTMLElement).tagName === "ASIDE")
    {
      this.showSpidIdpList = false;
    }
  }
}
