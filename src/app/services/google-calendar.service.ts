import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  user$: Observable<firebase.User>;
  calendarItems: any[];

  constructor(public afAuth: AngularFireAuth) {

    this.initClient();
    this.user$ = afAuth.authState;
  }
  initClient() {
      gapi.load('client', () => {
        console.log('loaded client');

        gapi.client.init({
          apiKey: 'AIzaSyDm0pPLoYGEtK-ZrQvwTQp8kdNBUgKs7sw', // Para más tarde.
        });
      });
  }
}
