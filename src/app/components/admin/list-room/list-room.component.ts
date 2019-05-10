import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {CongresoInterface} from '../../../models/congreso';
import {SalaApiService} from '../../../services/sala-api.service';
import {SalaInterface} from '../../../models/sala';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  constructor(private dataApi: SalaApiService, private authService: AuthService) { }
  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  private rooms: SalaInterface[];
  private nombreSala: string;
  nombreSalaFiltro = '';

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
  }

  getListCongress() {
    this.dataApi.getAllRooms().subscribe( sala => {
      this.rooms = sala;
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
}
