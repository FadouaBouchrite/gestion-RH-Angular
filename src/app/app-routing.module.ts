import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RhDashComponent } from './components/rh-dash/rh-dash.component';
import { EmployeDashComponent } from './components/employe-dash/employe-dash.component';
import { CongeRhComponent } from './components/conge-rh/conge-rh.component';
import { EmployeCongeComponent } from './employe-conge/employe-conge.component';
import { UserService } from './services/user.service';
import { EmplAbsenceComponent } from './empl-absence/empl-absence.component';
import { RhEmployesComponent } from './components/rh-employes/rh-employes.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { RhAbsencesComponent } from './rh-absences/rh-absences.component';
const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
  { path: '', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'rhDash', component: RhDashComponent },
  { path: 'conge', component: CongeRhComponent },
  { path: 'employeAbsence', component: EmplAbsenceComponent },
  { path: 'employeConge', component: EmployeCongeComponent },
  { path: 'employeDash', component: EmployeDashComponent },
  {path:'rhEmployes',component:RhEmployesComponent},
  {path:'addEmploye',component:AddUserComponent},
  {path:'rhAbsences',component:RhAbsencesComponent}

  // Redirection vers la page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
