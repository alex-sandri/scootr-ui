import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './home/signed-in/scan/scan.component';
import { DetailsComponent } from './settings/details/details.component';
import { AddComponent } from './settings/wallets/payment-methods/add/add.component';
import { PaymentMethodsComponent } from './settings/wallets/payment-methods/payment-methods.component';
import { WalletsComponent } from './settings/wallets/wallets.component';

const routes: Routes = [
  { path: "scan", component: ScanComponent, canActivate: [ SignedInGuard ] },
  {
    path: "settings",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "details", component: DetailsComponent },
      {
        path: "wallets",
        children: [
          {
            path: ":id/payment-methods",
            children: [
              { path: "add", component: AddComponent },
              { path: "", component: PaymentMethodsComponent },
            ],
          },
          { path: "", component: WalletsComponent },
        ],
      },
      { path: "", component: DetailsComponent },
    ],
  },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
