import { Component, OnInit } from '@angular/core';
import {CongresoApiService} from '../../services/congreso-api.service';
import {SinapticoApiService} from '../../services/sinaptico-api.service';
import {CongresoInterface} from '../../models/congreso';
import {SalaInterface} from '../../models/sala';
import { AuthenticationService } from '../../services/auth.service';
import {SalaApiService} from '../../services/sala-api.service';
import {InvitadoApiService} from '../../services/invitado-api.service';
import {SinapticoInterface} from '../../models/sinaptico';
import {InvitadoInterface} from '../../models/invitado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Almacenamos en arrays los valores.
  public congress: CongresoInterface[];
  public salas: SalaInterface[];
  public sinoptico: SinapticoInterface[];
  public invitados: InvitadoInterface[]

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  constructor(private congresoApi: CongresoApiService, private salasApi: SalaApiService, private authService: AuthenticationService, private sinopticoApi: SinapticoApiService, private invitadosApi: InvitadoApiService) { }
  // Método para iniciar los métodos al inicio del componente.
  ngOnInit() {
    this.getAllCongress();
    this.getAllRooms();
    this.getAllGuests();
    this.getAllSinoptics();
    this.getUser();
  }
  /* Métodos para recoger de cada service todos los elementos necesarios para mostrar */
  getAllCongress() {
    this.congresoApi.getAllCongress().subscribe(congresos => {
      this.congress = congresos;
    });
  }

  getAllRooms() {
    this.salasApi.getAllRooms().subscribe(salas => {
      this.salas = salas;
    });
  }

  getAllSinoptics() {
    this.sinopticoApi.getAllSinaptics().subscribe(sinoptico => {
      this.sinoptico = sinoptico;
    });
  }

  getAllGuests() {
    this.invitadosApi.getAllGuests().subscribe(invitados => {
      this.invitados = invitados;
    });
  }

  getUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }

}
