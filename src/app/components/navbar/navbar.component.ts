import { Component } from '@angular/core';

import {  OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId: number| null = null; 

  constructor(private authService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }
  onSubmit(){
    this.authService.logout()
    this.router.navigate(['/'])
  }
}