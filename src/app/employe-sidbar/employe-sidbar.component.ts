import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employe-sidbar',
  templateUrl: './employe-sidbar.component.html',
  styleUrl: './employe-sidbar.component.css'
})
export class EmployeSidbarComponent {

  constructor(private userService:UserService,private router :Router){}
  absenceEmpl(){
    if(this.userService.isAuthenticated() && this.userService.isEmploye()){
      this.router.navigate(['/employeAbsence'])
    }
  }
  comgeEmpl(){
    if(this.userService.isAuthenticated() && this.userService.isEmploye()){
      this.router.navigate(['/employeConge'])
    }
  }
  homeEmpl(){
    if(this.userService.isAuthenticated() && this.userService.isEmploye()){
      this.router.navigate(['/employeDash'])
    }
  }
}
