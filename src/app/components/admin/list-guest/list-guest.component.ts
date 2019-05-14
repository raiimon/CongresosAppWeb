import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthenticationService } from '../../../services/auth.service';
import {CongresoInterface} from '../../../models/congreso';
import {InvitadoApiService} from '../../../services/invitado-api.service';
import {InvitadoInterface} from '../../../models/invitado';
import {CongresoApiService} from '../../../services/congreso-api.service';

@Component({
  selector: 'app-list-guest',
  templateUrl: './list-guest.component.html',
  styleUrls: ['./list-guest.component.css']
})
export class ListGuestComponent implements OnInit {


  constructor(private dataApi: InvitadoApiService, private authService: AuthenticationService, private dataCongress: CongresoApiService) { }
  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  private guests: InvitadoInterface[];
  private congress: CongresoInterface[];
  nombreCongresoSeleccionado: any;
  private filterGuest = '';

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
    this.getListGuest();
  }

  getListGuest() {
    this.dataApi.getAllGuests().subscribe( invitado => {
      this.guests = invitado;
    });
  }

  getListCongress() {
    this.dataCongress.getAllCongress().subscribe( congreso => {
      this.congress = congreso;
    });
  }

  onDeleteGuest(idCongreso: string): void {
    const confirmacion = confirm('¿Deseas eliminar este congreso?');

    if (confirmacion) {
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

  showCheck(congres: CongresoInterface) {
    this.dataApi.selectedInvitado = Object.assign({}, congres);
  }

  onPreUpdateGuest(congres: CongresoInterface) {
    this.dataApi.selectedInvitado = Object.assign({}, congres);
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
