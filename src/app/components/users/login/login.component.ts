import {Component, NgZone, OnInit} from '@angular/core';

// Importamos OAuth de Firebase para Google y Facebook.
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

// Importamos el servicio de autenticación.
import { AuthenticationService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables para obtener el correo y contraseña de usuario sin loggin con Google o Facebook.
  public email: string = '';
  public password: string = '';


  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {}

  // Método para inicio de sesión normal.
  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => this.onError(err));
  }

  /* Método para iniciar sesión con Google. Llamamos al servicio que tenemos en 'auth.services.ts', el 'void' no devolvemos nada. */
  onLoginGoogle(): void {

    // LLamamos el servicio.
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
    }).catch( err => this.onError(err));
  }

  // Método para redireccionar a la ruta de admin.
  onLoginRedirect(): void {
    this.router.navigate(['home']);
  }
  // Método para mostrar los errores obtenidos por Firebase.
  onError(error) {
    console.log('error', error.message);
  }
}
