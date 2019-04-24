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

  onDeleteCongress(idSala: string): void {
    const confirmacion = confirm('¿Deseas eliminar este congreso?');

    if(confirmacion) {
      this.dataApi.deleteRoom(idSala);
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

  search() {
    if (this.nombreSala !== '') {
      this.rooms = this.rooms.filter(search => {
        return this.removeAccents(search.nombreSala.toLocaleLowerCase()).match(this.removeAccents(this.nombreSala.toLocaleLowerCase()));
      });
    } else if (this.nombreSala === '') {
      this.ngOnInit();
    }
  }

  // Función para eliminar acentos
  removeAccents(value) {
    return value
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
  }

}
