import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './home/signed-in/scan/scan.component';

const routes: Routes = [
  // TODO: Create SignedIn Guard
  { path: "scan", component: ScanComponent },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
