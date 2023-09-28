import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { KnobModule } from 'primeng/knob';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KnobModule,
    CardModule,
    TimelineModule,
    TableModule
  ],
  providers: [],
  bootstrap: [DashboardComponent
]
})
export class AppModule { }
