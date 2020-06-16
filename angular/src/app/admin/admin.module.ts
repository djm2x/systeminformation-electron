import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { MatModule } from '../mat.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { GeneralComponent } from './general/general.component';
import { DashComponent } from './dash/dash.component';
import { WifiComponent } from './wifi/wifi.component';
import { SheetbottomComponent } from './sheetbottom/sheetbottom.component';

@NgModule({
  declarations: [
    AdminComponent,
    GeneralComponent,
    DashComponent,
    WifiComponent,
    SheetbottomComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // HttpClientModule,
    MatModule,
    // FormsModule,
    // ReactiveFormsModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
  ]
})
export class AdminModule { }
