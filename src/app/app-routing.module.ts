import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importamos proteccion de rutas.
import { AuthGuard} from './guards/auth.guard';

// Componentes que vamos a importar.
import {LoginComponent} from './components/users/login/login.component';
import {RegisterComponent} from './components/users/register/register.component';
import {ProfileComponent} from './components/users/profile/profile.component';
import {Page404Component} from './components/page404/page404.component';
import {ListCongressComponent} from './components/admin/list-congress/list-congress.component';
import {ListGuestComponent} from './components/admin/list-guest/list-guest.component';
import {ListRoomComponent} from './components/admin/list-room/list-room.component';
import {ListSinapticComponent} from './components/admin/list-sinaptic/list-sinaptic.component';
import {SinapticComponent} from './components/sinaptic/sinaptic.component';
import {ControlComponent} from './components/control/control.component';
import {CheckComponent} from './components/check/check.component';
import {HomeComponent} from './components/home/home.component';

// Animación
import { LoaderComponent } from './components/loader/loader.component';

// En las rutas, añadimos la seguridad de las AuthGuard.
// De esta manera evitamos que si el usuario no ha iniciado sesión, no pueda acceder.

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'loader', component: LoaderComponent },
  { path: 'admin/list-congress', component: ListCongressComponent, canActivate: [AuthGuard] },
  { path: 'admin/list-guest', component: ListGuestComponent, canActivate: [AuthGuard] },
  { path: 'check', component: CheckComponent, canActivate: [AuthGuard] },
  { path: 'admin/list-room', component: ListRoomComponent, canActivate: [AuthGuard] },
  { path: 'admin/list-sinaptic', component: ListSinapticComponent, canActivate: [AuthGuard] },
  { path: 'home', component: ListSinapticComponent, canActivate: [AuthGuard] },
  { path: 'sinaptic', component: SinapticComponent, canActivate: [AuthGuard] },
  { path: 'control', component: ControlComponent, canActivate: [AuthGuard] },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
