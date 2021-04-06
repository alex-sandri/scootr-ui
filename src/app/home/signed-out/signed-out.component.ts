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

  public spidSignInEndpoint = environment.spid.endpoint;

  public spidIdentityProviders = [
    {
      id: "arubaid",
      name: "Aruba ID",
    },
    {
      id: "infocertid",
      name: "Infocert ID",
    },
    {
      id: "intesaid",
      name: "Intesa ID",
    },
    {
      id: "lepidaid",
      name: "Lepida ID",
    },
    {
      id: "namirialid",
      name: "Namirial ID",
    },
    {
      id: "posteid",
      name: "Poste ID",
    },
    {
      id: "sielteid",
      name: "Sielte ID",
    },
    {
      id: "spiditalia",
      name: "SPIDItalia Register.it",
    },
    {
      id: "timid",
      name: "Tim ID",
    },
  ];

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
