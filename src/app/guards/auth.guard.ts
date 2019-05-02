import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

// Importamos las librerías necesarias.
import {AngularFireAuth} from '@angular/fire/auth';
import {take, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {

  }
  // Con este guard de seguridad comprobaremos que el usuario a parte de estar loggeado también haya verificado el inicio de sesión, de manera que evitamos entrada de bots.

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise <boolean> | boolean {
      if ( this.authService.isLoggedIn !== true) {
        window.alert('No has verificado tu correo!');
        this.router.navigate(['user/login']);
      }
      return true;
  }
}
