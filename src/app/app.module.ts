import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SignedOutHomeComponent } from './home/signed-out/signed-out.component';
import { SignedInHomeComponent } from './home/signed-in/signed-in.component';
import { CookieService } from 'ngx-cookie-service';
import { ScanComponent } from './home/signed-in/scan/scan.component';
import { DetailsComponent } from './account/details/details.component';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { WalletsComponent } from './account/wallets/wallets.component';
import { DangerButtonComponent } from './components/danger-button/danger-button.component';
import { BadgeComponent } from './components/badge/badge.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NewWalletComponent } from './account/wallets/new/new.component';
import { WalletMenuComponent } from './account/wallets/wallet/menu/menu.component';
import { WalletDetailsComponent } from './account/wallets/wallet/details/details.component';
import { PaymentMethodsComponent } from './account/wallets/wallet/payment-methods/payment-methods.component';
import { AddPaymentMethodComponent } from './account/wallets/wallet/payment-methods/add/add.component';
import { AddFundsComponent } from './account/wallets/wallet/add-funds/add-funds.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { RidesComponent } from './account/rides/rides.component';
import { AccountMenuComponent } from './account/menu/menu.component';
import { RideMenuComponent } from './account/rides/ride/menu/menu.component';
import { RideDetailsComponent } from './account/rides/ride/details/details.component';
import { RideMapComponent } from './account/rides/ride/map/map.component';
import { TransactionsComponent } from './account/wallets/wallet/transactions/transactions.component';
import { SubscriptionsComponent } from './account/wallets/wallet/subscriptions/subscriptions.component';
import { SubscriptionListComponent } from './account/wallets/wallet/subscriptions/list/list.component';
import { AdvancedSettingsComponent } from './account/settings/advanced/advanced.component';

registerLocaleData(localeIt, "it");

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignedOutHomeComponent,
    SignedInHomeComponent,
    ScanComponent,
    DetailsComponent,
    WalletsComponent,
    DangerButtonComponent,
    BadgeComponent,
    SpinnerComponent,
    NewWalletComponent,
    WalletDetailsComponent,
    WalletMenuComponent,
    PaymentMethodsComponent,
    AddPaymentMethodComponent,
    AddFundsComponent,
    DialogComponent,
    RidesComponent,
    AccountMenuComponent,
    RideMenuComponent,
    RideDetailsComponent,
    RideMapComponent,
    TransactionsComponent,
    SubscriptionsComponent,
    SubscriptionListComponent,
    AdvancedSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthService) =>
      {
        return (): Promise<any> =>
        {
          return auth.init();
        };
      },
      deps: [ AuthService ],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "it",
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
