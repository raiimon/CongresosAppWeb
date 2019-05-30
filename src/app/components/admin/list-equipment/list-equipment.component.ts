import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/auth.service';
import {EquipamientoInterface} from '../../../models/equipamiento';
import {EquipamientoService} from '../../../services/equipamiento.service';
import {SubfamiliaApiService} from '../../../services/subfamilia-api.service';
import {SubfamiliaInterface} from '../../../models/subfamilia';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.css']
})
export class ListEquipmentComponent implements OnInit {

  constructor(public dataApi: EquipamientoService, public authService: AuthenticationService, private subFamilyApi: SubfamiliaApiService) { }

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  public equipments: EquipamientoInterface[];
  public subfamily: SubfamiliaInterface[];
  subfamilySearch = '';
  nombreSubFamilia: any;
  idSubFamilia: any;
  nombreCongresoSeleccionado: string;


  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListEquipments();
    this.getCurrentUser();
    this.obtenerNombreCongreso();
    this.getListSubfamily();
  }

  getListEquipments() {
    this.dataApi.getAllEquipments().subscribe(equipments => {
      this.equipments = equipments;
    });
  }

  getListSubfamily() {
    this.subFamilyApi.getAllSubFamilies().subscribe( data => {
      this.subfamily = data.map(e => {
        return {
          idSubFamilia: e.payload.doc.id,
          ...e.payload.doc.data()
        } as SubfamiliaInterface;
      });
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

  onSaveSubfamily(subfamilies: NgForm): void {

    subfamilies.value.nombreSubFamilia = this.nombreSubFamilia;

    if (this.idSubFamilia == null || this.idSubFamilia === '') {

      subfamilies.value.userUid = this.userUid;
      this.subFamilyApi.addSubfamily(subfamilies.value);

    } else {
      subfamilies.value.idSubFamilia = this.idSubFamilia;
      subfamilies.value.userUid = this.userUid;

      this.subFamilyApi.updateSubfamily(subfamilies.value);

    }
  }

  onDeleteSubFamily(idEquipamiento, cantidad) {

    console.log(cantidad);
    const confirmacion = confirm('¿Deseas eliminar esta elemento del almacen?');

    if (confirmacion) {
      this.subFamilyApi.deleteSubfamily(this.idSubFamilia);
    }
  }
}
