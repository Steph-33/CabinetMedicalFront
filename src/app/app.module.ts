import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientPageComponent } from './components/patient-page/patient-page.component';
import { InfirmierPageComponent } from './components/infirmier-page/infirmier-page.component';
import { HomeComponent } from './components/home/home.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { DeplacementPageComponent } from './components/deplacement-page/deplacement-page.component';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { GenericFieldsetPatientComponent } from './components/generic-fieldset-patient/generic-fieldset-patient.component';
import { GenericFieldsetInfirmierComponent } from './components/generic-fieldset-infirmier/generic-fieldset-infirmier.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientPageComponent,
    InfirmierPageComponent,
    HomeComponent,
    TitleBarComponent,
    DeplacementPageComponent,
    GenericButtonComponent,
    GenericFieldsetPatientComponent,
    GenericFieldsetInfirmierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
