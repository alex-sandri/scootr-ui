import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user?: IUser;

  constructor(private api: ApiService, private router: Router)
  {}

  public async init(): Promise<IUser | null>
  {
    const sessionId = localStorage.getItem("session.id");

    if (!sessionId)
    {
      return null;
    }

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
