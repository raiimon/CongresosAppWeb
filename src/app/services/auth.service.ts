import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {UserInterface} from '../models/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/* Servicio para la autenticación  de los usuarios, donde tenemos el login-registro-registro con Facebook y Google -
Logout - Actualización del perfil y la comprobación del tipo de rol. */

export class AuthService {

  private userDoc: AngularFirestoreDocument<UserInterface>;

  userData: any; // Save logged in user data

  constructor(public afsAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router, public ngZone: NgZone) {

    this.afsAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }


  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user);
        }).catch(err => console.log(reject(err)))
        .then(() => this.afsAuth.auth.currentUser.sendEmailVerification()
          .then(() => {
            alert('Verifique su buzón de correo electrónico.');
          })).catch((error) => {
            console.log('Error: ' + error);
      });
    });
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

   deleteUserData(id: string) {

    this.userDoc = this.afs.doc<UserInterface>(`users/${id}`);

    this.userDoc.delete();
  }

  isUserAdmin(userId) {
    return this.afs.doc<UserInterface>(`users/${userId}`).valueChanges();
  }
}

