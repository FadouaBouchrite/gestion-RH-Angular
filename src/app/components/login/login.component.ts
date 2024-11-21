import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  
  constructor(private userService: UserService,private router: Router) {}
  onSubmit() {
    if (!this.email || !this.password) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }
  
    const userData = {
      email: this.email,
      password: this.password
    };
  
    console.log('Données envoyées :', userData); 
  
    this.userService.login(userData)
      .subscribe(
        (response: any) => { 
          console.log('Réponse du serveur :', response);
          const token = response.token;
          const role = response.role;
          console.log('token'+token);  console.log('role'+role);
          

          if (token && role) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            if (role === 'RH') {
              this.router.navigate(['/rh']); 
            } else if (role === 'EMPLOYE') {
              this.router.navigate(['/employe']); 
            } else {
              console.error('Rôle non reconnu:', role);
            }
          } else {
            console.error('Aucun token ou rôle reçu dans la réponse.');
          }
        },
        error => {
          console.error('Erreur lors de l\'envoi des données :', error);
        }
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    return token !== null;
  }

  isRH() {
    const role = localStorage.getItem("role");
    return role === "RH";
  }

  isEmploye() {
    const role = localStorage.getItem("role");
    return role === "EMPLOYE";
  }
}
