import { Component } from '@angular/core';

@Component({
  selector: 'signed-out-home',
  templateUrl: './signed-out.component.html',
  styleUrls: ['./signed-out.component.scss']
})
export class SignedOutHomeComponent
{
  public spidIdentityProviders = [
    {
      name: "Aruba ID",
      id: "https://loginspid.aruba.it",
      imageName: "arubaid",
    },
    {
      name: "Infocert ID",
      id: "https://identity.infocert.it",
      imageName: "infocertid",
    },
    {
      name: "Intesa ID",
      id: "https://spid.intesa.it",
      imageName: "intesaid",
    },
    {
      name: "Lepida ID",
      id: "https://id.lepida.it/idp/shibboleth",
      imageName: "lepidaid",
    },
    {
      name: "Namirial ID",
      id: "https://idp.namirialtsp.com/idp",
      imageName: "namirialid",
    },
    {
      name: "Poste ID",
      id: "https://posteid.poste.it",
      imageName: "posteid",
    },
    {
      name: "Sielte ID",
      id: "https://identity.sieltecloud.it",
      imageName: "sielteid",
    },
    {
      name: "SPIDItalia Register.it",
      id: "https://spid.register.it",
      imageName: "spiditalia",
    },
    {
      name: "Tim ID",
      id: "https://login.id.tim.it/affwebservices/public/saml2sso",
      imageName: "timid",
    },
  ];

  constructor()
  {}
}
