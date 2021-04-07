import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser, ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user?: IUser;

  constructor(private api: ApiService, private cookie: CookieService, private router: Router)
  {}

  public async init(): Promise<IUser | null>
  {
    let sessionId = localStorage.getItem("session.id");

    if (this.cookie.check("session_id"))
    {
      sessionId = this.cookie.get("session_id");

      this.cookie.delete("session_id", "/");
    }

    if (!sessionId)
    {
      return null;
    }

    localStorage.setItem("session.id", sessionId);

    const response = await this.api.retrieveSession(sessionId);

    this.user = response.data?.user;

    return this.user ?? null;
  }

  public async signOut(): Promise<void>
  {
    const sessionId = localStorage.getItem("session.id");

    if (sessionId)
    {
      await this.api.deleteSession(sessionId);

      this.user = undefined;

      localStorage.clear();

      this.router.navigateByUrl("/");
    }
  }
}
