import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './home/signed-in/scan/scan.component';
import { AdvancedComponent } from './settings/advanced/advanced.component';
import { DetailsComponent } from './settings/details/details.component';
import { NewWalletComponent } from './settings/wallets/new/new.component';
import { AddFundsComponent } from './settings/wallets/wallet/add-funds/add-funds.component';
import { WalletDetailsComponent } from './settings/wallets/wallet/details/details.component';
import { AddPaymentMethodComponent } from './settings/wallets/wallet/payment-methods/add/add.component';
import { PaymentMethodsComponent } from './settings/wallets/wallet/payment-methods/payment-methods.component';
import { WalletsComponent } from './settings/wallets/wallets.component';

const routes: Routes = [
  { path: "scan", component: ScanComponent, canActivate: [ SignedInGuard ] },
  {
    path: "settings",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "advanced", component: AdvancedComponent },
      { path: "details", component: DetailsComponent },
      {
        path: "wallets",
        children: [
          { path: "new", component: NewWalletComponent },
          {
            path: ":id",
            children: [
              { path: "add-funds", component: AddFundsComponent },
              { path: "details", component: WalletDetailsComponent },
              {
                path: "payment-methods",
                children: [
                  { path: "add", component: AddPaymentMethodComponent },
                  { path: "", component: PaymentMethodsComponent },
                ],
              },
              { path: "", component: WalletDetailsComponent },
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
