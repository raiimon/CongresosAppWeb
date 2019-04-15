import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importamos proteccion de rutas.
import { AuthGuard} from './guards/auth.guard';

// Componentes que vamos a importar.
import {HomeComponent} from './components/home/home.component';
import {DetailsBookComponent} from './components/details-book/details-book.component';
import {ListBooksComponent} from './components/admin/list-books/list-books.component';
import {LoginComponent} from './components/users/login/login.component';
import {RegisterComponent} from './components/users/register/register.component';
import {ProfileComponent} from './components/users/profile/profile.component';
import {Page404Component} from './components/page404/page404.component';

// Aquí indicamos los componentes que voy a usar y quiero enrutar.
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'book/:id', component: DetailsBookComponent },
  { path: 'admin/list-books', component: ListBooksComponent, canActivate: [AuthGuard] },
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
