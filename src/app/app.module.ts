import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component'; 
import { Routes, RouterModule } from '@angular/router';
import path from 'path';
import { NavbarComponent } from './components/navbar/navbar.component'; 
import { RhDashComponent } from './components/rh-dash/rh-dash.component';
import { EmployeDashComponent } from './components/employe-dash/employe-dash.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CongeRhComponent } from './components/conge-rh/conge-rh.component';
import { EmployeCongeComponent } from './employe-conge/employe-conge.component';
import { EmployeSidbarComponent } from './employe-sidbar/employe-sidbar.component';
import { EmplAbsenceComponent } from './empl-absence/empl-absence.component';
import { RhEmployesComponent } from './components/rh-employes/rh-employes.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { RhAbsencesComponent } from './rh-absences/rh-absences.component';
import { NgChartsModule } from 'ng2-charts';
import { StorageService } from './storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
const appRoutes:Routes=[
  {path:'' , component:LoginComponent},
  {path:'login' , component:LoginComponent},
  {path:'rh' , component:RhDashComponent},
  {path:'employe' , component:EmployeDashComponent},
  {path:'conge',component:CongeRhComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,
    RhDashComponent,
    EmployeDashComponent,
    SidebarComponent,
    CongeRhComponent,
    EmployeCongeComponent,
    EmployeSidbarComponent,
    EmplAbsenceComponent,
    RhEmployesComponent,
    AddUserComponent,
    RhAbsencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    StorageService,
    provideHttpClient(withFetch())
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }