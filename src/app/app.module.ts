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

// Chart
import { ChartsModule } from 'ng2-charts';

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

// Importamos las librerías necesarias para el calendario.
import {DayPilotModule} from 'daypilot-pro-angular';


// Importamos otro modulos...
import { AngularFirestore } from '@angular/fire/firestore';
import { ListCongressComponent } from './components/admin/list-congress/list-congress.component';
import { ListGuestComponent } from './components/admin/list-guest/list-guest.component';
import { ListRoomComponent } from './components/admin/list-room/list-room.component';
import { SinapticComponent } from './components/sinaptic/sinaptic.component';
import { ListSinapticComponent } from './components/admin/list-sinaptic/list-sinaptic.component';
import { ControlComponent } from './components/control/control.component';
import { CheckComponent } from './components/check/check.component';
import {NavbarExteriorComponent} from './components/navbar-exterior/navbar-exterior.component';


// Importamos nuestro filtro personalizado.
import { FilterCongressPipe } from './pipes/filter-congress.pipe';
import { FilterGuestPipe } from './pipes/filter-guest.pipe';
import { FilterRoomPipe } from './pipes/filter-room.pipe';
import { FilterSinapticPipe } from './pipes/filter-sinaptic.pipe';
import { LoaderComponent } from './components/loader/loader.component';

// Librerías de Spinner.
import { LoadingSpinnersModule } from 'ngx-loading-spinners';
import { VerifyEmailComponent } from './components/users/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/users/forgot-password/forgot-password.component';
import { PrincipalExteriorComponent } from './components/principal-exterior/principal-exterior.component';
import { ExteriorCaracteristicasComponent } from './components/principal-exterior/exterior-caracteristicas/exterior-caracteristicas.component';
import { ExteriorPreciosComponent } from './components/principal-exterior/exterior-precios/exterior-precios.component';
import {ExteriorModalidadesComponent} from './components/principal-exterior/exterior-modalidades/exterior-modalidades.component';

import {EventsComponent} from './components/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    ControlComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    ListCongressComponent,
    ListGuestComponent,
    ListRoomComponent,
    SinapticComponent,
    ListSinapticComponent,
    CheckComponent,
    FilterCongressPipe,
    FilterGuestPipe,
    FilterRoomPipe,
    FilterSinapticPipe,
    LoaderComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    PrincipalExteriorComponent,
    ExteriorCaracteristicasComponent,
    EventsComponent,
    ExteriorPreciosComponent,
    NavbarExteriorComponent,
    ExteriorModalidadesComponent
  ],
  imports: [
    LoadingSpinnersModule,
    DayPilotModule,
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    FormsModule, // Importamos el módulos de los formularios.
    AngularFireStorageModule, // Importamos en el app 'AngularFireStorageModule' para la subida de imágenes.
    AngularFireModule.initializeApp(environment.firebaseConfig), // Importamos la API de Firebase con los datos necesarios.
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
