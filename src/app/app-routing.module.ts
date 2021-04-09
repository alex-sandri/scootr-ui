import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './home/signed-in/scan/scan.component';
import { DetailsComponent } from './settings/details/details.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';

const routes: Routes = [
  { path: "scan", component: ScanComponent, canActivate: [ SignedInGuard ] },
  {
    path: "settings",
    canActivate: [ SignedInGuard ],
    children: [
      { path: "details", component: DetailsComponent },
      { path: "payment-methods", component: PaymentMethodsComponent },
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
