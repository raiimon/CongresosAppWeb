import {Component, OnInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';

// Importamos el servicio necesario.
import { AuthenticationService } from '../../../services/auth.service';

// Importamos la interface de usuario, que recoge los valores de Firebase.
import { UserInterface } from '../../../models/user';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {


  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(private authService: AuthenticationService,
              private storage: AngularFireStorage,
              private router: Router,
              private  afAuth: AngularFireAuth) { }

  user: UserInterface = {
    id: '',
    name: '',
    email: '',
    emailVerified: true,
    photoUrl: ''
  };

  // Obtener los valores.
  nombre;

  // Variable para cargar el porcentage de subida de una imagen.
  uploadPercent: Observable<number>;

  // Variable para obtener la url de la imagen.
  urlImage: Observable<string>;

  public provideId: string = 'null';

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.id = user.uid;
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.provideId = user.providerData[0].providerId;
      }
    });
  }

  // Método para subir archivos.
  subirImagenPerfil(e) {
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

  updateImageUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        user.updateProfile({
          displayName: this.nombre,
          photoURL: this.inputImageUser.nativeElement.value
        }).then(() => {
            this.redirectTo('user/profile');
        }).catch((error) => {
          console.log('error', error);
        });
      }
    });
  }

  updateName() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        user.updateProfile({
          displayName: this.nombre,
          photoURL: this.user.photoUrl
        }).then(() => {
          this.redirectTo('user/profile');
        }).catch((error) => {
          console.log('error', error);
        });
      }
    });
  }

  async resetPassword() {
    return await this.afAuth.auth.sendPasswordResetEmail(this.user.email);
  }

  // Método que 'actualiza' la página actual engañando al router.
  redirectTo(uri: string) {
    this.router.navigateByUrl('/GhostComponent', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  deleteUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        user.delete();
        this.authService.deleteUserData(this.user.id);
        this.redirectTo('user/login');
      }
    });
  }
}
