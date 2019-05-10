import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {UserInterface} from '../models/user';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

/* Servicio para la autenticación  de los usuarios, donde tenemos el login-registro-registro con Facebook y Google -
Logout - Actualización del perfil y la comprobación del tipo de rol. */

export class AuthenticationService {

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
          this.sendVerificationEmail();
        }).catch(err => console.log(reject(err)));
    });
  }

  sendVerificationEmail() {
    return this.afsAuth.auth.currentUser.sendEmailVerification()
    .then( () => {
      this.router.navigate(['/user/verify-email']);
    });
  }

  loginEmailUser(email: string, password: string) {
    return this.afsAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.updateUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user));
  }

  loginGoogleUser() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afsAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          console.log('Correcto');
        }, err => {
          console.log(err);
          reject(err);
          console.log('Error');

        });
    });
  }

  signOut() {
    return new Promise<any>((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afsAuth.auth.signOut().then( () => {
          localStorage.removeItem('user');
          this.router.navigate(['']);
          this.userData = undefined;
          console.log('Correcto');
        });
        resolve();
      } else {
        console.log('Incorrecto');
        reject();
      }
    });
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
      name: user.displayName,
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
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

  recoverPassword(passwordResetEmail) {
    return this.afsAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Comprueba tu correo y sigue los pasos.');
      }).catch((error) => {
        window.alert(error);
      });
  }
}

