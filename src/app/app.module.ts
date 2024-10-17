import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component'; 
import { Routes, RouterModule } from '@angular/router';
import path from 'path';
import { RhDashComponent } from './components/rh-dash/rh-dash.component';
import { EmployeDashComponent } from './components/employe-dash/employe-dash.component';

const appRoutes:Routes=[
  {path:'' , component:LoginComponent},
  {path:'login' , component:LoginComponent},
  {path:'rh' , component:RhDashComponent},
  {path:'employe' , component:EmployeDashComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,
    RhDashComponent,
    EmployeDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }