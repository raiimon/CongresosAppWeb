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

  onSaveCongress(congressForm: NgForm): void {
    // Comprobamos si existe el id, en caso de existir realizar un PUT de todo.

    if (congressForm.value.idCongreso == null) {
      // POST
      // Obtenemos y almacenamos el id del usuario.
      congressForm.value.userUid = this.userUid;
      this.dataCongress.addCongress(congressForm.value);

    } else {
      // PUT
      this.dataCongress.updateCongress(congressForm.value);
    }
    // Limpiamos el formulario.
    congressForm.resetForm();
    this.btnCloseCongreso.nativeElement.click();
  }

  onSaveGuest(guestForm: NgForm): void {
    // Comprobamos si existe el id, en caso de existir realizar un PUT de todo.

    if (guestForm.value.idInvitado == null) {
      // POST
      // Obtenemos y almacenamos el id del usuario.
      guestForm.value.userUid = this.userUid;
      this.dataGuest.addGuest(guestForm.value);

    } else {
      // PUT
      this.dataGuest.updateGuest(guestForm.value);
    }
    // Limpiamos el formulario.
    guestForm.resetForm();
    this.btnCloseInvitado.nativeElement.click();
  }





  onSaveRoom(guestForm: NgForm): void {
    // Comprobamos si existe el id, en caso de existir realizar un PUT de todo.

    guestForm.value.nombreCongreso = this.nombreCongresoSeleccionado;

    if (guestForm.value.idSala == null) {
      // POST
      // Obtenemos y almacenamos el id del usuario.
      guestForm.value.userUid = this.userUid;
      this.dataRoom.addRoom(guestForm.value);

    } else {
      // PUT
      this.dataRoom.updateRoom(guestForm.value);
    }
    // Limpiamos el formulario.
    guestForm.resetForm();
    this.btnCloseCongreso.nativeElement.click();
  }


  onSaveSinaptic(sessionSinaptic: NgForm): void {
    // Comprobamos si existe el id, en caso de existir realizar un PUT de todo.

    // Almacenamos URL del sinaptico
    sessionSinaptic.value.imgSinaptico = this.inputImageUser.nativeElement.value;

    if (sessionSinaptic.value.idInvitado == null) {
      // POST
      // Obtenemos y almacenamos el id del usuario.
      sessionSinaptic.value.userUid = this.userUid;
      this.sinaptic.addSinaptic(sessionSinaptic.value);

    } else {
      // PUT
      this.sinaptic.updateSinaptic(sessionSinaptic.value);
    }
    // Limpiamos el formulario.
    sessionSinaptic.resetForm();
    this.btnCloseRoom.nativeElement.click();
  }

  onUpload(e) {
    // Generamos una ID aleatoria para las imágenes.
    const id = Math.random().toString(36).substring(2);

    // Obtenemos por array el primer indicio de imagen (el único que hay).
    const file = e.target.files[0];

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
