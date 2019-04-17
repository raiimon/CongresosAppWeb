import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';

// Módulo de formularios.
import {FormsModule} from '@angular/forms';


// Importar API Firebase.
import {environment} from '../environments/environment';

// Importar Firebase npm.
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

// Importar el FileStorage para las imagenes.
import { AngularFireStorageModule} from '@angular/fire/storage';

// Importamos otro modulos...
import { AngularFirestore } from '@angular/fire/firestore';
import { ListCongressComponent } from './components/admin/list-congress/list-congress.component';
import { ListGuestComponent } from './components/admin/list-guest/list-guest.component';
import { ListRoomComponent } from './components/admin/list-room/list-room.component';
import { SinapticComponent } from './components/sinaptic/sinaptic.component';
import { ListSinapticComponent } from './components/admin/list-sinaptic/list-sinaptic.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    ListCongressComponent,
    ListGuestComponent,
    ListRoomComponent,
    SinapticComponent,
    ListSinapticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
