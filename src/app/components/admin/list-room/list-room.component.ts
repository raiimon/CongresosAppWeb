import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import {CongresoInterface} from '../../../models/congreso';
import {SalaApiService} from '../../../services/sala-api.service';
import {SalaInterface} from '../../../models/sala';
import {CongresoApiService} from '../../../services/congreso-api.service';
import {SalaEquipmentApiService} from '../../../services/sala-equipment-api.service';
import {SalaEquipmentInterface} from '../../../models/salaEquipment';
@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  constructor(private dataApi: SalaApiService, private dataEquipmentRoom: SalaEquipmentApiService, private authService: AuthenticationService, private dataCongress: CongresoApiService) { }
  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  private rooms: SalaInterface[];
  private congress: CongresoInterface[];
  private roomEquipments: SalaEquipmentInterface[];
  nombreCongresoSeleccionado: any;
  nombreSalaFiltro = '';
  nombreSala: string;
  seleccionarSala: boolean = false;

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
    this.getListRooms();
    this.obtenerNombreCongreso();
    this.getListEquipments();
  }

  getListRooms() {
    this.dataApi.getAllRooms().subscribe( sala => {
      this.rooms = sala;
    });
  }

  getListCongress() {
    this.dataCongress.getAllCongress().subscribe( congreso => {
      this.congress = congreso;
    });
  }

  getListEquipments() {
    this.dataEquipmentRoom.getAllSubFamilies().subscribe(roomEquipments => {
      this.roomEquipments = roomEquipments;
    });
  }

  onDeleteRooms(id: string): void {
    const confirmacion = confirm('¿Deseas eliminar esta sala?');

    if (confirmacion) {
      this.dataApi.deleteRoom(id);
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

  onPreUpdateRooms(congres: CongresoInterface) {
    this.dataApi.selectedSala = Object.assign({}, congres);
  }

  obtenerNombreCongreso() {
    // Almacenamos el valor en la variable para después almacenarlo en el formulario de Firebase.
    this.nombreCongresoSeleccionado = localStorage.getItem('nombreCongreso');
  }

  seleccionarHerramientas(nombreSala) {
    if (this.seleccionarSala) {
      this.nombreSala = '';
      this.seleccionarSala = false;
    } else {
      this.nombreSala = nombreSala;
      this.seleccionarSala = true;
    }
  }

  onDeleteRoomEquipment(idRoomEquipment) {
    const confirmacion = confirm('¿Deseas eliminar esta familia del almacen?');

    if (confirmacion) {
      this.dataEquipmentRoom.deleteSubfamily(idRoomEquipment);
    }
  }

  onUpdateRoomEquipments(roomEquipment) {
    this.dataEquipmentRoom.select = Object.assign({}, roomEquipment);
  }
}
