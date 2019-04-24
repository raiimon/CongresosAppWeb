import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {CongresoInterface} from '../../../models/congreso';
import {CongresoApiService} from '../../../services/congreso-api.service';

@Component({
  selector: 'app-list-congress',
  templateUrl: './list-congress.component.html',
  styleUrls: ['./list-congress.component.css']
})
export class ListCongressComponent implements OnInit {


  constructor(private dataApi: CongresoApiService, private authService: AuthService) {
  }

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  private congress: CongresoInterface[];
  private nombreCongreso: string;

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

  search() {
    if (this.nombreCongreso !== '') {
      this.congress = this.congress.filter(search => {
        return this.removeAccents(search.nombreCongreso.toLocaleLowerCase()).match(this.removeAccents(this.nombreCongreso.toLocaleLowerCase()));
      });
    } else if (this.nombreCongreso === '') {
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
