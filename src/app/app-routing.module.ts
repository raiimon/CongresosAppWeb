import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importamos proteccion de rutas.
import { AuthGuard} from './guards/auth.guard';

// Componentes que vamos a importar.
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/users/login/login.component';
import {RegisterComponent} from './components/users/register/register.component';
import {ProfileComponent} from './components/users/profile/profile.component';
import {Page404Component} from './components/page404/page404.component';
import {ListCongressComponent} from './components/admin/list-congress/list-congress.component';
import {ListGuestComponent} from './components/admin/list-guest/list-guest.component';
import {ListRoomComponent} from './components/admin/list-room/list-room.component';
import {ListSinapticComponent} from './components/admin/list-sinaptic/list-sinaptic.component';
import {SinapticComponent} from './components/sinaptic/sinaptic.component';

// Aquí indicamos los componentes que voy a usar y quiero enrutar.
const routes: Routes = [
  { path: '', component: SinapticComponent, canActivate: [AuthGuard]},
  // Añadimos seguridad a los componentes que están dentro de admin.
  { path: 'admin/list-congress', component: ListCongressComponent, canActivate: [AuthGuard] },
  { path: 'admin/list-guest', component: ListGuestComponent, canActivate: [AuthGuard] },
  { path: 'admin/list-room', component: ListRoomComponent, canActivate: [AuthGuard] },
  { path: 'admin/list-sinaptic', component: ListSinapticComponent, canActivate: [AuthGuard] },
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
