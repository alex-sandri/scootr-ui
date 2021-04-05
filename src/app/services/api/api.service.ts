import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface IApiServiceResponse<T>
{
  status: number,
  data?: T,
  errors?: {
    field: string,
    error: string,
  }[],
}

export interface IUser
{
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  birth_date: string,
  fiscal_number: string,
}

export interface ISession
{
  id: string,
  user: IUser,
  expires_at: string,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  constructor()
  {}

  private async send(
    method: "DELETE" | "GET" | "PATCH" | "POST" | "PUT",
    url: string,
    body?: any,
  ): Promise<IApiServiceResponse<any>>
  {
    const response = await fetch(`${environment.api.endpoint}/${url}`, {
      method,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("session.id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result: IApiServiceResponse<any> = { status: response.status };

    // No Content
    if (result.status === 204)
    {
      return result;
    }

    const json = await response.json();

    if (response.status !== 200)
    {
      result.errors = json.details;
    }
    else
    {
      result.data = json;
    }

    return result;
  }

  public async retrieveSignInRequest(id: string): Promise<IApiServiceResponse<{ session: ISession }>>
  {
    return this.send("GET", `auth/email/requests/${id}`);
  }

  public async signInWithEmail(email: string): Promise<IApiServiceResponse<{ id: string }>>
  {
    return this.send("POST", "auth/email", { email });
  }

  public async retrieveSession(id: string): Promise<IApiServiceResponse<ISession>>
  {
    return this.send("GET", `sessions/${id}`);
  }

  public async deleteSession(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `sessions/${id}`);
  }

  public async retrieveUser(id: string): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("GET", `users/${id}`);
  }

  public async createUser(data: {
    first_name: string,
    last_name: string,
    email: string,
    birth_date: string,
    fiscal_number: string,
  }): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("POST", "users", data);
  }

  public async updateUser(id: string, data: {
    email?: string,
  }): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("PATCH", `users/${id}`, data);
  }

  public async deleteUser(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `users/${id}`);
  }
}