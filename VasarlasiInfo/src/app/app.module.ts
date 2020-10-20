import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MegerositDialogComponent } from './megerosit-dialog/megerosit-dialog.component';
import { VarosokService } from './service/varosok.service';
import { FormComponent } from './form/form.component'

@NgModule({
  declarations: [
    AppComponent,
    MegerositDialogComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule, 
    ReactiveFormsModule
  ],
  providers: [VarosokService],
  bootstrap: [AppComponent]
})
export class AppModule { }
