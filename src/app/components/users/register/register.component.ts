import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// Importamos el servicio y el router.
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

// Importamos finalize para luego guardar la ruta de la imagen y recogerla en la base de datos.
import {LoadingSpinnersService} from 'ngx-loading-spinners';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Loader
  public loaderUniqeName: string;

  constructor(private router: Router,
              private authService: AuthService,
              public spinnersService: LoadingSpinnersService) { this.loaderUniqeName = spinnersService.getUniqueName();  }

  @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';


  // Traduccion de los errores de firebase
  errores: string;
  erroresEs: string = 'The email address is badly formatted.';
  vacio: string;

  ngOnInit() {
  }

  // Método para añadir usuario a Firebase.
  onAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: ''
            }).then( () => {
              this.cargarSpinner();
            }).catch((error) => {
            });
          }
        });
      }).catch(error => {
        // hacemos un if para cuando entre el error en ingles lo traduzca en español
        if (error.message === this.erroresEs) {
         this.errores = 'El correo no está bien formateado';
         this.vacio = this.errores;
         // con el alert mostramos el error
         alert(this.vacio);
        } else {
          this.errores = 'El correo ya existe'
          this.vacio = this.errores;
          alert(this.vacio);
        }
        });
  }

  cargarSpinner() {
    this.spinnersService.show(this.loaderUniqeName);
    this.router.navigate(['']);
  }
}
