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
import { SettingsMenuComponent } from './settings/menu/menu.component';
import { DetailsComponent } from './settings/details/details.component';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { WalletsComponent } from './settings/wallets/wallets.component';
import { WalletComponent } from './settings/wallets/wallet/wallet.component';
import { DangerButtonComponent } from './components/danger-button/danger-button.component';
import { BadgeComponent } from './components/badge/badge.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

registerLocaleData(localeIt, "it");

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignedOutHomeComponent,
    SignedInHomeComponent,
    ScanComponent,
    SettingsMenuComponent,
    DetailsComponent,
    WalletsComponent,
    WalletComponent,
    DangerButtonComponent,
    BadgeComponent,
    SpinnerComponent,
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
