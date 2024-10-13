import { Component } from '@angular/core';

import {  OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Service où vous gérez l'authentification

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId: number| null = null; // Variable pour stocker l'ID utilisateur

  constructor(private authService: UserService) { }

  ngOnInit(): void {
    // Récupérer l'ID utilisateur depuis un service ou le localStorage
    this.userId = this.authService.getUserId(); // Exemple de récupération d'ID utilisateur
  }
}

