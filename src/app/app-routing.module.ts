import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RhDashComponent } from './components/rh-dash/rh-dash.component';
import { EmployeDashComponent } from './components/employe-dash/employe-dash.component';
import { CongeRhComponent } from './components/conge-rh/conge-rh.component';
const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
  { path: '', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'rhDash', component: RhDashComponent },
  { path: 'employes', component: EmployeDashComponent },
  { path: 'conge', component: CongeRhComponent }
  // Redirection vers la page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
