import { APP_INITIALIZER, NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignedOutHomeComponent,
    SignedInHomeComponent,
    ScanComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
