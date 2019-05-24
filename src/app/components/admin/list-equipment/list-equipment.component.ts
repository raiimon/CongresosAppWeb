import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/auth.service';
import {EquipamientoInterface} from '../../../models/equipamiento';
import {EquipamientoService} from '../../../services/equipamiento.service';

@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.css']
})
export class ListEquipmentComponent implements OnInit {

  constructor(public dataApi: EquipamientoService, public authService: AuthenticationService) { }

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  public equipments: EquipamientoInterface[];
  subfamilySearch = '';
  nombreCongresoSeleccionado: string;

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListEquipments();
    this.getCurrentUser();
    this.obtenerNombreCongreso();
  }

  getListEquipments() {
    this.dataApi.getAllEquipments().subscribe(equipments => {
      this.equipments = equipments;
    });
  }

  obtenerNombreCongreso() {
    // Almacenamos el valor en la variable para después almacenarlo en el formulario de Firebase.
    this.nombreCongresoSeleccionado = localStorage.getItem('nombreCongreso');
  }

  onDeleteEquipment(idEquipment: string): void {
    const confirmacion = confirm('¿Deseas eliminar este equipamiento del almacen?');

    if (confirmacion) {
      this.dataApi.deleteEquipment(idEquipment);
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

  onPreUpdateEquipments(equipments: EquipamientoInterface) {
    this.dataApi.selectedEquipamiento = Object.assign({}, equipments);
  }

  showElementByUserID(elementValue) {
    if (this.userUid === elementValue.userUid || this.isAdmin === true) {
      return true;
    } else {
      return false;
    }
  }

}
