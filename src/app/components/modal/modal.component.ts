import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CongresoApiService} from '../../services/congreso-api.service';
import {InvitadoApiService} from '../../services/invitado-api.service';
import {SalaApiService} from '../../services/sala-api.service';
import {SinapticoApiService} from '../../services/sinaptico-api.service';
import {CongresoInterface} from '../../models/congreso';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  private selectedStatus: any;

  constructor(private storage: AngularFireStorage,
              private dataCongress: CongresoApiService,
              private dataGuest: InvitadoApiService,
              private dataRoom: SalaApiService,
              private sinaptic: SinapticoApiService) { }

  // Variables para añadir los valores de los congresos.
  private congress: CongresoInterface[];
  public nombreCongresoSeleccionado: string;

  // Variable para cargar el porcentage de subida de una imagen.
  uploadPercent: Observable<number>;

  // Variable para obtener la url de la imagen.
  urlImage: Observable<string>;

  @ViewChild('imageUser') inputImageUser: ElementRef;

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;

  @ViewChild('btnCloseCongreso') btnCloseCongreso: ElementRef;
  @ViewChild('btnCloseInvitado') btnCloseInvitado: ElementRef;
  @ViewChild('btnCloseSinaptic') btnCloseSinaptic: ElementRef;
  @ViewChild('btnCloseRoom') btnCloseRoom: ElementRef;


  ngOnInit() {
    this.getListCongress();
  }

  getListCongress() {
    this.dataCongress.getAllCongress().subscribe( congreso => {
      this.congress = congreso;
    });
  }

  // Obtener el nombre del congreso.
  obtenerNombreCongreso(event: Event) {
    // Obtenemos de la etiqueta.
    const selectedOptions = event.target['options'];

    // Comprobamos el índice.
    const selectedIndex = selectedOptions.selectedIndex;

    // Almacenamos el valor en la variable para después almacenarlo en el formulario de Firebase.
    this.nombreCongresoSeleccionado = selectedOptions[selectedIndex].text;

  }
  onSaveCongress(congressForm: NgForm, modal): void {

    switch (modal) {
      case 'congreso':

        if (congressForm.value.idCongreso == null) {

          congressForm.value.userUid = this.userUid;
          this.dataCongress.addCongress(congressForm.value);

        } else {

          this.dataCongress.updateCongress(congressForm.value);

        }
        break;

      case 'sinoptico':
        congressForm.value.imgSinaptico = this.inputImageUser.nativeElement.value;

        if (congressForm.value.idInvitado == null) {
          // POST
          // Obtenemos y almacenamos el id del usuario.
          congressForm.value.userUid = this.userUid;
          this.sinaptic.addSinaptic(congressForm.value);

        } else {
          // PUT
          this.sinaptic.updateSinaptic(congressForm.value);
        }
        break;

      case 'invitado':

        if (congressForm.value.idInvitado == null) {

          congressForm.value.userUid = this.userUid;
          this.dataGuest.addGuest(congressForm.value);

        } else {

          this.dataGuest.updateGuest(congressForm.value);

        }
        break;

      case 'sala':

        congressForm.value.nombreCongreso = this.nombreCongresoSeleccionado;

        if (congressForm.value.idSala == null) {
          // POST
          // Obtenemos y almacenamos el id del usuario.
          congressForm.value.userUid = this.userUid;
          this.dataRoom.addRoom(congressForm.value);

        } else {
          // PUT
          this.dataRoom.updateRoom(congressForm.value);
        }
        break;
    }

    // Limpiamos el formulario.
    congressForm.resetForm();
    this.btnCloseCongreso.nativeElement.click();
  }

  subirImagenSinoptico(imagen) {
    // Generamos una ID aleatoria para las imágenes.
    const id = Math.random().toString(36).substring(2);

    // Obtenemos por array el primer indicio de imagen (el único que hay).
    const file = imagen.target.files[0];

    // Ruta del fichero, donde almacenar las imágenes con 'profile_id' de ejemplo.
    const filePath = `sinaptico/profile_${id}`;

    // Ruta de la imagen donde enviar.
    const ref = this.storage.ref(filePath);

    // Variable donde se realiza la subida del fichero y la ruta.
    const task = this.storage.upload(filePath, file);

    // Cargamos el porcentaje de carga del fichero.
    this.uploadPercent = task.percentageChanges();

    // Para obtener la ruta del fichero.
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL()))
      .subscribe();
  }
}
