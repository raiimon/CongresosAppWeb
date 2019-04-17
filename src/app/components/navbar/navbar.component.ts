import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Variable para comprobar si estamos loggeados.
  public isLogged: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private afsAuth: AngularFireAuth) { }

  ngOnInit() {
    // Llamamos al método nada más se inicie el Navbar.
    this.getCurrentUser();
  }

  // Comprobar que el usuario esta autenticado.
  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        // El usuario ha iniciado la sesión.
        this.isLogged = true;
      }
    });
  }

  // Método para cerrar la sesión.
  onLogout() {
    this.afsAuth.auth.signOut();
  }
}
