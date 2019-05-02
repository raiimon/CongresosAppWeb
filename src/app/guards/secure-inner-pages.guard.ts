import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements  CanActivate{
  constructor(private authService: AuthService,
              private router: Router) {

  }
  // Con este guard de seguridad comprobaremos que el usuario a parte de estar loggeado también haya verificado el inicio de sesión, de manera que evitamos entrada de bots.

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise <boolean> | boolean {
    if ( this.authService.isLoggedIn ) {
      this.router.navigate(['user/login']);
    }
    return true;
  }
}
