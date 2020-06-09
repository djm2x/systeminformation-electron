import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { GeneralComponent } from './general/general.component';
import { DashComponent } from './dash/dash.component';
import { WifiComponent } from './wifi/wifi.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full'},
      { path: 'dash', component: DashComponent },
      { path: 'general', component: GeneralComponent },
      { path: 'wifi', component: WifiComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
