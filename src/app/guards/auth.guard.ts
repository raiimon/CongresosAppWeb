import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

// Importamos el servicio.
import {AuthenticationService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router) {}
  /* Comprobamos si el usuario ha iniciado sesión, en caso que no este loggeado ni verificado le volvera a la página de Login */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise <boolean> | boolean {
      if ( this.authService.isLoggedIn !== true) {
        this.router.navigate(['user/login']);
      }
      return true;
  }
}
