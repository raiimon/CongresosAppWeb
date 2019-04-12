import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {auth, User} from 'firebase/app';

// Sección Roles Firebase.
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {UserInterface} from '../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user);
        }).catch(err => console.log(reject(err)));
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
    this.router.navigate(['/user/login']);
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

