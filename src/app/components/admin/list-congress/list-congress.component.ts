import {Component, OnDestroy, OnInit} from '@angular/core';
import {CongresoInterface} from '../../../models/congreso';
import {CongresoApiService} from '../../../services/congreso-api.service';
import { AuthenticationService} from '../../../services/auth.service';
import {UserInterface} from '../../../models/user';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-congress',
  templateUrl: './list-congress.component.html',
  styleUrls: ['./list-congress.component.css']
})
export class ListCongressComponent implements OnInit {

  constructor(public dataApi: CongresoApiService, public authService: AuthenticationService, private toast:ToastrService) { }

  showSuccess(){
    this.toast.info('La vida es una mierda','¡Yo se que si!');

  }
  

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  public congress: CongresoInterface[];
  public users: UserInterface[];
  filterCongress = '';

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  checkSameValue = 0;

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

  showElementByUserID(elementValue) {

    if (this.userUid === elementValue.userUid) {
      this.checkSameValue++;
      return true;
    }
  }
}
