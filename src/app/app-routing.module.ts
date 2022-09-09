import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientPageComponent } from './components/patient-page/patient-page.component';
import { InfirmierPageComponent } from './components/infirmier-page/infirmier-page.component';
import { HomeComponent } from './components/home/home.component';
import { DeplacementPageComponent } from './components/deplacement-page/deplacement-page.component';
import { AddDeplacementPageComponent } from './components/add-deplacement-page/add-deplacement-page.component';

const routes: Routes = [
  { path: 'patient', component: PatientPageComponent },
  { path: 'infirmier', component: InfirmierPageComponent },
  { path: 'deplacement', component: DeplacementPageComponent },
  { path: 'add-deplacement', component: AddDeplacementPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }