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

@NgModule({
  declarations: [
    AppComponent,
    PatientPageComponent,
    InfirmierPageComponent,
    HomeComponent,
    TitleBarComponent,
    DeplacementPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
