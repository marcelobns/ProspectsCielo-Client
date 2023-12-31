import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ProspectosComponent } from './pages/prospectos/prospectos.component';

import { KnobModule } from 'primeng/knob';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    ProspectosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    KnobModule,
    CardModule,
    TimelineModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    ToastModule,
    TagModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [ProspectosComponent
]
})
export class AppModule { }
