import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {CongresoInterface} from '../../../models/congreso';
import {CongresoApiService} from '../../../services/congreso-api.service';

@Component({
  selector: 'app-list-congress',
  templateUrl: './list-congress.component.html',
  styleUrls: ['./list-congress.component.css']
})
export class ListCongressComponent implements OnInit {

  constructor(public dataApi: CongresoApiService, public authService: AuthService) {
  }

  posts = [
    {
      "id": 1,
      "title": "Post One",
      "date": "02/04/2019"
    },
    {
      "id": 2,
      "title": "Post Two",
      "date": "11/04/2019"
    },
    {
      "id": 3,
      "title": "asdd Three",
      "date": "30/01/2019"
    },
    {
      "id": 4,
      "title": "Postater Four",
      "date": "30/05/2019"
    },
    {
      "id": 5,
      "title": "Posterter Five",
      "date": "30/04/2019"
    }
  ];

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  public congress: CongresoInterface[];
  filterPost = '';

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
  }

  getListCongress() {
    this.dataApi.getAllCongress().subscribe(congreso => {
      this.congress = congreso;
    });
  }

  onDeleteCongress(idCongreso: string): void {
    const confirmacion = confirm('¿Deseas eliminar este congreso?');

    if (confirmacion) {
      this.dataApi.deleteCongress(idCongreso);
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
    this.dataApi.selectedCongreso = Object.assign({}, congres);
  }
}
