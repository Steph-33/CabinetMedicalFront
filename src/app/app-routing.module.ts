import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientPageComponent } from './components/patient-page/patient-page.component';
import { InfirmierPageComponent } from './components/infirmier-page/infirmier-page.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'patient', component: PatientPageComponent},
  {path: 'infirmier', component: InfirmierPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }