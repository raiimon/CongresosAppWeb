import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements  CanActivate{
  constructor(private authService: AuthenticationService,
              private router: Router) {

  }
  // Con este guard de seguridad comprobaremos que el usuario a parte de estar loggeado también haya verificado el inicio de sesión, de manera que evitamos entrada de bots.

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise <boolean> | boolean {
    if ( this.authService.isLoggedIn ) {
      window.alert('No puedes acceder, tienes la sesión iniciada.');
      this.router.navigate(['home']);
    }
    return true;
  }
}
