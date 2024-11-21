import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private userService:UserService,private router :Router){}
  homeAdmin(){
    if(this.userService.isAuthenticated() && this.userService.isRH()){
      this.router.navigate(['/rhDash'])
    }
  }
  absenceAdmin(){
    if(this.userService.isAuthenticated() && this.userService.isRH()){
      this.router.navigate(['/rhAbsences'])
    }
  }
  congeAdmin(){
    if(this.userService.isAuthenticated() && this.userService.isRH()){
      this.router.navigate(['/conge'])
    }
  }
  employesAdmin(){
    if(this.userService.isAuthenticated() && this.userService.isRH()){
      this.router.navigate(['/rhEmployes'])
    }
  }

}
