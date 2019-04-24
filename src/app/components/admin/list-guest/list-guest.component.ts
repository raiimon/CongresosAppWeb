import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {CongresoInterface} from '../../../models/congreso';
import {InvitadoApiService} from '../../../services/invitado-api.service';
import {InvitadoInterface} from '../../../models/invitado';

@Component({
  selector: 'app-list-guest',
  templateUrl: './list-guest.component.html',
  styleUrls: ['./list-guest.component.css']
})
export class ListGuestComponent implements OnInit {


  constructor(private dataApi: InvitadoApiService, private authService: AuthService) { }
  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  private guests: InvitadoInterface[];
  private nombre: string;
  private filterGuest = '';

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
  }

  getListCongress() {
    this.dataApi.getAllGuests().subscribe( invitado => {
      this.guests = invitado;
    });
  }

  onDeleteCongress(idCongreso: string): void {
    const confirmacion = confirm('¿Deseas eliminar este congreso?');

    if(confirmacion) {
      this.dataApi.deleteGuest(idCongreso);
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
    this.dataApi.selectedInvitado = Object.assign({}, congres);
  }
}
