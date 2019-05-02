import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import {UserInterface} from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Variable para comprobar si estamos loggeados.
  public isLogged: boolean = false;

  public provideId: string = 'null';

  constructor(private authService: AuthService,
              private router: Router,
              private afsAuth: AngularFireAuth) { }

  user: UserInterface = {
    emailVerified: true,
    photoUrl: ''
  };

  public datos = JSON.parse(localStorage.getItem('user'));

  ngOnInit() {
    // Llamamos al método nada más se inicie el Navbar.
    this.getCurrentUser();

    console.log(this.datos);

    this.authService.isAuth().subscribe(user => {
      if (user) {
        if (user.photoURL) {
          this.user.photoUrl = user.photoURL;
        } else {
          this.user.photoUrl = '../../assets/img/default-user.png' ;
        }
        this.provideId = user.providerData[0].providerId;
      }
    });
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
