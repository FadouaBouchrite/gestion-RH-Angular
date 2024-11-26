import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  constructor(public router:Router){}
  title = 'front-rh';
  shouldDisplayHeader(): boolean {
    // List of routes where you do not want to display the header (including the home page '/')
    const routesWithoutHeader = ['/'];
    
    // Check if the current URL matches any of the routes where the header should be hidden
    return !routesWithoutHeader.includes(this.router.url);
  }
  
}
