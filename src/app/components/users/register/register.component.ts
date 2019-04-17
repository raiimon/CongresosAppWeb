import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// Importamos el servicio y el router.
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

// Importamos finalize para luego guardar la ruta de la imagen y recogerla en la base de datos.
import { finalize } from 'rxjs/operators';
import {Observable, from} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private storage: AngularFireStorage)
              { }

  @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';

  // Variable para cargar el porcentage de subida de una imagen.
  uploadPercent: Observable<number>;

  // Variable para obtener la url de la imagen.
  urlImage: Observable<string>;

  // Traduccion de los errores de firebase
  errores: string;
  erroresEs: string= "The email address is badly formatted.";
  erroresE: string= "The email address is already in use by another account.";
  vacio : string;

  ngOnInit() {
  }

  // Método para subir archivos.
  onUpload(e) {
    // Generamos una ID aleatoria para las imágenes.
    const id = Math.random().toString(36).substring(2);

    // Obtenemos por array el primer indicio de imagen (el único que hay).
    const file = e.target.files[0];

    // Ruta del fichero, donde almacenar las imágenes con 'profile_id' de ejemplo.
    const filePath = `upload/profile_${id}`;

    // Ruta de la imagen donde enviar.
    const ref = this.storage.ref(filePath);

    // Variable donde se realiza la subida del fichero y la ruta.
    const task = this.storage.upload(filePath, file);

    // Cargamos el porcentaje de carga del fichero.
    this.uploadPercent = task.percentageChanges();

    // Para obtener la ruta del fichero.
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL()))
      .subscribe();
  }

  // Método para añadir usuario a Firebase.
  onAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then( () => {
              this.router.navigate(['admin/list-books']);
            }).catch((error) => {
            });
          }
        });
      }).catch(error => {
        // hacemos un if para cuando entre el error en ingles lo traduzca en español
        if (error.message == this.erroresEs){
         this.errores = "El correo no está bien formateado";
         this.vacio = this.errores;
         // con el alert mostramos el error
         alert(this.vacio);
        }
        else{
          this.errores = "El correo ya existe"
          this.vacio = this.errores;
          alert(this.vacio);
        }
        });
  }
}
