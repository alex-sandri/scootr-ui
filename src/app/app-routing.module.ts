import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RideDetailsComponent } from './account/rides/ride/details/details.component';
import { RideMapComponent } from './account/rides/ride/map/map.component';
import { RidesComponent } from './account/rides/rides.component';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './home/signed-in/scan/scan.component';
import { DetailsComponent } from './account/details/details.component';
import { NewWalletComponent } from './account/wallets/new/new.component';
import { AddFundsComponent } from './account/wallets/wallet/add-funds/add-funds.component';
import { WalletDetailsComponent } from './account/wallets/wallet/details/details.component';
import { AddPaymentMethodComponent } from './account/wallets/wallet/payment-methods/add/add.component';
import { PaymentMethodsComponent } from './account/wallets/wallet/payment-methods/payment-methods.component';
import { SubscriptionsComponent } from './account/wallets/wallet/subscriptions/subscriptions.component';
import { TransactionsComponent } from './account/wallets/wallet/transactions/transactions.component';
import { WalletsComponent } from './account/wallets/wallets.component';
import { AdvancedSettingsComponent } from './account/settings/advanced/advanced.component';

const routes: Routes = [
  {
    path: "account",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "details", component: DetailsComponent },
      {
        path: "rides",
        children: [
          {
            path: ":id",
            children: [
              { path: "details", component: RideDetailsComponent },
              { path: "map", component: RideMapComponent },
              { path: "", component: RideDetailsComponent },
            ],
          },
          { path: "", component: RidesComponent },
        ],
      },
      {
        path: "settings",
        children: [
          { path: "advanced", component: AdvancedSettingsComponent },
          { path: "", component: RidesComponent },
        ],
      },
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
              { path: "subscriptions", component: SubscriptionsComponent },
              { path: "transactions", component: TransactionsComponent },
              { path: "", component: WalletDetailsComponent },
            ],
          },
          { path: "", component: WalletsComponent },
        ],
      },
      { path: "", component: DetailsComponent },
    ],
  },
  { path: "scan", component: ScanComponent, canActivate: [ SignedInGuard ] },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
