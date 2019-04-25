import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {auth} from 'firebase/app';

// Sección Roles Firebase.
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {UserInterface} from '../models/user';

@Injectable({
  providedIn: 'root'
})

/* Servicio para la autenticación  de los usuarios, donde tenemos el login-registro-registro con Facebook y Google -
Logout - Actualización del perfil y la comprobación del tipo de rol. */

export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user);
        }).catch(err => console.log(reject(err)));
    });
  }

  updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,

      roles: {
        editor : true
      }
    };
    return userRef.set(data, {merge: true});
  }

  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user));
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user));
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }


  // Método para la comprobación del Navbar.
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  // Método para los roles.
  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        editor : true
      }
    };
    return userRef.set(data, {merge: true});
  }

  isUserAdmin(userId) {
    return this.afs.doc<UserInterface>(`users/${userId}`).valueChanges();
  }
}

