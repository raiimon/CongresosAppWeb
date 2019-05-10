import { Component, OnInit } from '@angular/core';
import {CongresoApiService} from '../../services/congreso-api.service';
import {SinapticoApiService} from '../../services/sinaptico-api.service';
import {CongresoInterface} from '../../models/congreso';
import {SalaInterface} from '../../models/sala';
import { AuthenticationService } from '../../services/auth.service';
import {SalaApiService} from '../../services/sala-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Almacenamos en arrays los valores.
  public congress: CongresoInterface[];
  public salas: SalaInterface[];

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  constructor(private congresoApi: CongresoApiService, private salasApi: SalaApiService, public authService: AuthenticationService) { }

  ngOnInit() {
    this.getAllCongress();
    this.getAllRooms();
    this.getUser();
  }

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
