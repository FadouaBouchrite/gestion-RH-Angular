import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  
  constructor(private userService: UserService,private router: Router,private localStorageService:LocalStorageService) {}
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
            this.localStorageService.setItem('token', token);
            this.localStorageService.setItem('role', role);
            
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
    this.localStorageService.removeItem("token");
    this.localStorageService.removeItem("role");
  }

  isAuthenticated() {
    const token = this.localStorageService.getItem("token");
    return token !== null;
  }

  isRH() {
    const role = this.localStorageService.getItem("role");
    return role === "RH";
  }

  isEmploye() {
    const role = this.localStorageService.getItem("role");
    return role === "EMPLOYE";
  }
}
