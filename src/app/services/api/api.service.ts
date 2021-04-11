import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface IApiServiceResponse<T>
{
  status: number,
  success: boolean,
  data?: T,
  errors?: {
    field: string,
    error: string,
  }[],
}

export interface IPaymentMethod
{
  id: string,
  type: string,
  data: any,
  wallet: IWallet,
  __metadata?: {
    is_default: boolean,
  },
}

export interface ISession
{
  id: string,
  user: IUser,
  expires_at: string,
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

export interface IVehicle
{
  id: string,
  battery_level: number,
  location: {
    latitude: number,
    longitude: number,
  },
}

export interface IWallet
{
  id: string,
  name: string,
  balance: number,
  user: IUser,
  __metadata?: {
    is_default: boolean,
  },
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

    const result: IApiServiceResponse<any> = {
      status: response.status,
      success: response.status >= 200 && response.status < 300,
    };

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

  /* ------------------
  -- PAYMENT METHODS --
  ------------------ */

  public async listPaymentMethodsForWallet(walletId: string): Promise<IApiServiceResponse<IPaymentMethod[]>>
  {
    return this.send("GET", `wallets/${walletId}/payment-methods`);
  }

  public async addPaymentMethodToWallet(stripePaymentMethodId: string, walletId: string): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("POST", `wallets/${walletId}/payment-methods`, {
      id: stripePaymentMethodId,
    });
  }

  public async setDefaultPaymentMethodForWallet(paymentMethodId: string, walletId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("PUT", `wallets/${walletId}/payment-methods/default`, {
      id: paymentMethodId,
    });
  }

  public async deletePaymentMethod(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `payment-methods/${id}`);
  }

  /* -----------
  -- SESSIONS --
  ----------- */

  public async retrieveSession(id: string): Promise<IApiServiceResponse<ISession>>
  {
    return this.send("GET", `sessions/${id}`);
  }

  public async deleteSession(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `sessions/${id}`);
  }

  /* --------
  -- USERS --
  -------- */

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

  /* -----------
  -- VEHICLES --
  ----------- */

  public async listVehiclesNearLocation(
    location: {
      latitude: number,
      longitude: number,
    },
    radius: number,
  ): Promise<IApiServiceResponse<IVehicle[]>>
  {
    return this.send("GET", `vehicles?location[latitude]=${location.latitude}&location[longitude]=${location.longitude}&radius=${radius}`);
  }

  /* ----------
  -- WALLETS --
  ---------- */

  public async listWalletsForUser(userId: string): Promise<IApiServiceResponse<IWallet[]>>
  {
    return this.send("GET", `users/${userId}/wallets`);
  }

  public async retrieveWallet(walletId: string): Promise<IApiServiceResponse<IWallet>>
  {
    return this.send("GET", `wallets/${walletId}`);
  }

  public async createWalletForUser(data: {
    name: string,
  }, userId: string): Promise<IApiServiceResponse<IWallet>>
  {
    return this.send("POST", `users/${userId}/wallets`, data);
  }

  public async addFundsToWallet(amount: number, walletId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `wallets/${walletId}/funds`, { amount });
  }

  public async updateWallet(walletId: string, data: {
    name?: string,
  }): Promise<IApiServiceResponse<IWallet>>
  {
    return this.send("PATCH", `wallets/${walletId}`, data);
  }

  public async setDefaultWalletForUser(walletId: string, userId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("PUT", `users/${userId}/wallets/default`, { id: walletId });
  }

  public async deleteWallet(walletId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `wallets/${walletId}`);
  }
}
