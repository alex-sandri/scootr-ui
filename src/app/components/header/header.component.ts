import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent
{
  @Input()
  public theme: "light" | "dark" = "light";

  @Output()
  public search = new EventEmitter<string>();

  public showNav = false;

  constructor(public auth: AuthService, public router: Router)
  {}
}
