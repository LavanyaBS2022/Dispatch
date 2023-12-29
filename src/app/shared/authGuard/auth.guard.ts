// auth.guard.ts
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      // Redirect to the login page or another route
      return this.router.createUrlTree(['/login']);
    }
  }
}
