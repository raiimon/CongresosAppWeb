import {Component, OnInit} from '@angular/core';
import {CongresoInterface} from '../../../models/congreso';
import {CongresoApiService} from '../../../services/congreso-api.service';
import { AuthenticationService} from '../../../services/auth.service';

@Component({
  selector: 'app-list-congress',
  templateUrl: './list-congress.component.html',
  styleUrls: ['./list-congress.component.css']
})
export class ListCongressComponent implements OnInit {

  constructor(public dataApi: CongresoApiService, public authService: AuthenticationService) { }

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  public congress: CongresoInterface[];
  filterCongress = '';
  nombreCongresoSeleccionado: string;

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
    this.checkNameCongress();
  }

  getListCongress() {
    this.dataApi.getAllCongress().subscribe(congreso => {
      this.congress = congreso;
    });
  }

  onDeleteCongress(idCongreso: string): void {
    const confirmacion = confirm('¿Deseas eliminar este congreso?');

    if (confirmacion) {
      this.dataApi.deleteCongress(idCongreso);
    }
  }

  getCurrentUser() {
    return this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
            this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }

  checkNameCongress() {
    if (localStorage.getItem('nombreCongreso')) {
      this.nombreCongresoSeleccionado = localStorage.getItem('nombreCongreso');
      return true;
    }
  }

  selectCongress(nombreCongreso, idCongreso) {

    this.nombreCongresoSeleccionado = nombreCongreso;

    if (localStorage.getItem('idCongreso') && localStorage.getItem('nombreCongreso')) {
        localStorage.removeItem('nombreCongreso');
        localStorage.removeItem('idCongreso');

      } else {
        // Almacenamos la ID y nombre del congreso en un localStorage.
        localStorage.setItem('idCongreso', idCongreso);
        localStorage.setItem('nombreCongreso', nombreCongreso);
      }
  }
  congresoSeleccionado() {
    if (localStorage.getItem('nombreCongreso')) {
      return true;
    } else {
      return false;
    }
  }

  onPreUpdateCongress(congres: CongresoInterface) {
    this.dataApi.selectedCongreso = Object.assign({}, congres);
  }

  showElementByUserID(elementValue) {
    if (this.userUid === elementValue.userUid || this.isAdmin === true) {
      return true;
    } else {
      return false;
    }
  }
}
