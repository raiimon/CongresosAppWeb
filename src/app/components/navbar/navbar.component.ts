import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  private fotoPerfil: any;

  ngOnInit() {
    this.getUser();
    this.congresoSeleccionado();
  }

  getUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.fotoPerfil = auth.photoURL;
      }
    });
  }

  congresoSeleccionado() {
    if (localStorage.getItem('nombreCongreso')) {
      return true;
    } else {
      return false;
    }
  }
}
