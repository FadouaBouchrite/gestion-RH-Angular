import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private storageService: StorageService) {}
  token:string|null=null

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'];
    this.token=this.storageService.getItem("token")
    if(this.token!=null){
      const userRole = this.userService.getRole(this.token);
      if (userRole && userRole === expectedRole) {
        return true; 
      }
    }
    // Redirection en cas de rôle non autorisé
    this.router.navigate(['/']);
    return false;
  }
}
