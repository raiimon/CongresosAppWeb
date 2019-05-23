import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {UserInterface} from '../models/user';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})

/* Servicio para la autenticación  de los usuarios, donde tenemos el login-registro-registro con Facebook y Google -
Logout - Actualización del perfil y la comprobación del tipo de rol. */

export class AuthenticationService {

  private userDoc: AngularFirestoreDocument<UserInterface>;

  userData: any; // Almacenamos los datos del usuario de manera local.

  constructor(public afsAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router, public ngZone: NgZone) {

    /* Dentro del constructor comprobamos el estado del usuario, en caso de que exista (hemos iniciado sesión) almacenamos un localStorage del mismo
      para luego a la hora de cerrar sesión, se elimine por completo y cierre la sesión.
     */
    this.afsAuth.authState.subscribe(user => {
      if (user) {
        // Almacenamos los valores.
        this.userData = user;
        // Convertimos a formato JSON lo obtenido.
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        // En caso de error, el localStorage almacenara un usuario nulo.
        localStorage.setItem('user', null);
        // De esta manera, si no existe o no ha iniciado sesión podemos usar los AuthGuard.
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  /* Método para registrar un usuario, recogemos el correo y contraseña y lo creamos en firebase.
    Se realiza mediante un Promise, que espera a que se haya verificado el usuario.
   */
  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
            // Llamamos al método para añadir el rol de 'editor'
            this.updateUserData(userData.user);
          // Llamamos al método que realiza la comprobación del correo.
          this.sendVerificationEmail();
        }).catch(err => console.log(reject(err)));
    });
  }
  // Método para la verificación, reenvía a la verificación de correo.
  sendVerificationEmail() {
    return this.afsAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['/user/verify-email']);
      });
  }
  // Método para realizar el loggin del usuario. Similar al registro, recogemos el campo de correo y contraseña.
  loginEmailUser(email: string, password: string) {
    return this.afsAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          // Si ha salido satisfactorio, nos envía al component de 'Home'
          this.router.navigate(['home']);
        });
        // Volvemos a 'comprobar' el rol.
        this.updateUserData(result.user);
      }).catch((error) => {
        // window.alert(error.message);
      });
  }

  // Método que usaremos en los Guards para comprobar si el usuario ha iniciado sesión y si esta verificado.
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  /* Loggin de Redes Sociales, Los dos son similares ya que usan el OAuth de Firebase. */

  // Login de Google.
  async  loginWithGoogle() {
    return await this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  /* ------------------------ */

  signOut() {
    return new Promise<any>((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afsAuth.auth.signOut().then(() => {
          localStorage.removeItem('user');
          this.router.navigate(['']);
          this.userData = undefined;
        });
        resolve();
      } else {
        reject();
      }
    });
  }

  // Comprobamos que el usuario ha iniciado sesión.
  isAuth() {
    // tslint:disable-next-line:no-shadowed-variable
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  // Actualizamos el usuario, para que tenga por defecto el rol de 'editor'.
  private updateUserData(user) {

    // Obtenemos el UID del usuario desde AngularFirestoreDocument.
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    // Actualizamos en el service del usuario los datos con el rol.
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
      roles: {
        editor: true
      }
    };
    return userRef.set(data, {merge: true});
  }

  // Eliminamos un usuario desde la ID obtenida en la parte de profile.
  deleteUserData(id: string) {
    // Recogemos al usuario desde AngularFirestoreDocument.
    this.userDoc = this.afs.doc<UserInterface>(`users/${id}`);
    // Eliminamos el usuario, desde el service de angular.
    this.userDoc.delete();
  }

  // Método para comprobar mediante la ID del usuario que almacenamos en AngularFireStore funciona correctamente.
  isUserAdmin(userId) {
    return this.afs.doc<UserInterface>(`users/${userId}`).valueChanges();
  }

  // Método para resetear la contraseña.
  recoverPassword(passwordResetEmail) {
    return this.afsAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Comprueba tu correo y sigue los pasos.');
      }).catch((error) => {
        window.alert(error);
      });
  }
}


