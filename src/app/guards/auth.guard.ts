import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

// Importamos las librerías necesarias.
import {AngularFireAuth} from '@angular/fire/auth';
import {take, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {

  constructor(private afsAuth: AngularFireAuth,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

    // Comprobamos si el usuario esta loggeado.
    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        // En caso de que no este autenticado, que 'auth' no tenga nada almacenado. Le reenviará a la página de Login.
          if (!auth) {
            // Enviamos a la página de 'Login'.
            this.router.navigate(['/user/login']);
          }
      }));
  }

}
