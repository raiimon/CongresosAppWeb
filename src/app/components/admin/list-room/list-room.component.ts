import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import {CongresoInterface} from '../../../models/congreso';
import {SalaApiService} from '../../../services/sala-api.service';
import {SalaInterface} from '../../../models/sala';
import {CongresoApiService} from '../../../services/congreso-api.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  constructor(private dataApi: SalaApiService, private authService: AuthenticationService, private dataCongress: CongresoApiService) { }
  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  private rooms: SalaInterface[];
  private congress: CongresoInterface[];
  nombreCongresoSeleccionado: any;
  nombreSalaFiltro = '';

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
    this.getListRooms();
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

  onDeleteCongress(id: string): void {
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

  onPreUpdateCongress(congres: CongresoInterface) {
    this.dataApi.selectedSala = Object.assign({}, congres);
  }

  obtenerNombreCongreso(event: Event) {

    // Obtenemos de la etiqueta.
    const selectedOptions = event.target['options'];

    // Comprobamos el índice.
    const selectedIndex = selectedOptions.selectedIndex;

    // Almacenamos el valor en la variable para después almacenarlo en el formulario de Firebase.
    this.nombreCongresoSeleccionado = selectedOptions[selectedIndex].text;

  }
}
