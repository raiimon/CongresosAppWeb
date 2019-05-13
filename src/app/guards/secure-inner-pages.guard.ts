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
  /* Similar al otro Guard, usando la misma sesión pero con la diferencia de que si ha iniciado sesión no le deja acceder a las rutas
    de inicio de sesión. */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise <boolean> | boolean {
    if ( this.authService.isLoggedIn ) {
      // Envía una alerta al usuario.
      window.alert('No puedes acceder, tienes la sesión iniciada.');
      // Reenvía al usuario a la principal de los usuarios con inicio de sesión.
      this.router.navigate(['home']);
    }
    return true;
  }
}
