import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import {CongresoInterface} from '../../../models/congreso';
import {SinapticoApiService} from '../../../services/sinaptico-api.service';
import {SinapticoInterface} from '../../../models/sinaptico';

@Component({
  selector: 'app-list-sinaptic',
  templateUrl: './list-sinaptic.component.html',
  styleUrls: ['./list-sinaptic.component.css']
})
export class ListSinapticComponent implements OnInit {

  constructor(private dataApi: SinapticoApiService, private authService: AuthenticationService) { }
  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  private sinaptics: SinapticoInterface[];
  private nombreSinopticoFiltro = '';
  nombreCongresoSeleccionado: any;

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  checkSameValue = 0;

  ngOnInit() {
    this.getListSinoptics();
    this.getCurrentUser();
    this.obtenerNombreCongreso();
  }

  getListSinoptics() {
    this.dataApi.getAllSinaptics().subscribe( congreso => {
      this.sinaptics = congreso;
    });
  }

  onDeleteSinoptics(idCongreso: string): void {
    const confirmacion = confirm('¿Deseas eliminar este congreso?');

    if (confirmacion) {
      this.dataApi.deleteSinaptic(idCongreso);
    }
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
            this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }

  onPreUpdateSinoptics(congres: CongresoInterface) {
    this.dataApi.selectedSinaptic = Object.assign({}, congres);
  }

  obtenerNombreCongreso() {
    // Almacenamos el valor en la variable para después almacenarlo en el formulario de Firebase.
    this.nombreCongresoSeleccionado = localStorage.getItem('nombreCongreso');
  }

  showElementByUserID(elementValue) {
    if (this.userUid === elementValue.userUid || this.isAdmin === true) {
      return true;
    } else {
      return false;
    }
  }
}
