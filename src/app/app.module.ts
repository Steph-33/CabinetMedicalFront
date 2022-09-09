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
import { InfirmierCreateComponent } from './components/infirmier-create/infirmier-create.component';
import { InfirmierUpdateComponent } from './components/infirmier-update/infirmier-update.component';
import { GenericFormPatientComponent } from './components/generic-form-patient/generic-form-patient.component';
import { AddDeplacementPageComponent } from './components/add-deplacement-page/add-deplacement-page.component';

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
    GenericFieldsetInfirmierComponent,
    InfirmierCreateComponent,
    InfirmierUpdateComponent,
    GenericFormPatientComponent,
    AddDeplacementPageComponent
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
