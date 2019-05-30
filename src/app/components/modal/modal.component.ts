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
import {CalendarService} from '../../services/calendar.service';
import {SalaInterface} from '../../models/sala';
import {EquipamientoService} from '../../services/equipamiento.service';
import {EquipamientoInterface} from '../../models/equipamiento';
import {SalaEquipmentApiService} from '../../services/sala-equipment-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  private cantidad: any;
  private idEquipamiento: any;
  private cantidadOriginal: any;

  // Variables para añadir los valores de los congresos.
  private congress: CongresoInterface[];
  private rooms: SalaInterface[];
  private equipments: EquipamientoInterface[];
  private uniqueEquipments: EquipamientoInterface;
  private cantidadEquipamientoSala: number;

  constructor(private storage: AngularFireStorage,
              private dataCongress: CongresoApiService,
              private dataEquipment: EquipamientoService,
              private dataGuest: InvitadoApiService,
              private dataRoom: SalaApiService,
              private sinaptic: SinapticoApiService,
              private dataRoomEquipment: SalaEquipmentApiService,
              private dataEvent: CalendarService) {}

  // Variables para almacenar los nombres de congreso y sala.
  public nombreCongresoSeleccionado: string;
  public nombreSalaSeleccionado: string;

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
  @ViewChild('btnCloseEvents') btnCloseEvents: ElementRef;
  @ViewChild('btnCloseEquipment') btnCloseEquipment: ElementRef;
  @ViewChild('btnCloseSaveEquipments') btnCloseSaveEquipments: ElementRef;
  @ViewChild('btnCloseUpdateRoomEquipment') btnCloseUpdateRoomEquipment: ElementRef;

  ngOnInit() {
    this.idEquipamiento = localStorage.getItem('idEquipamiento');
    this.getListCongress();
    this.getListRooms();
    this.getCongressName();
    this.getListEquipments();
  }

  getListCongress() {
    this.dataCongress.getAllCongress().subscribe( congreso => {
      this.congress = congreso;
    });
  }

  getListRooms() {
    this.dataRoom.getAllRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  getListEquipments() {
    this.dataEquipment.getAllEquipments().subscribe( equipamiento => {
        this.equipments = equipamiento;
    });
  }

  getCongressName() {
    this.nombreCongresoSeleccionado = localStorage.getItem('nombreCongreso');
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

  obtenerNombreSala(event: Event) {
    // Obtenemos de la etiqueta.
    const selectedOptions = event.target['options'];

    // Comprobamos el índice.
    const selectedIndex = selectedOptions.selectedIndex;

    // Almacenamos el valor en la variable para después almacenarlo en el formulario de Firebase.
    this.nombreSalaSeleccionado = selectedOptions[selectedIndex].value;
  }

  onSaveCongress(congressForm: NgForm, modal): void {

    switch (modal) {
      case 'congreso':

        // Convertir la fecha de entrada y salida para Firebase.
        const fechaEntradaCongreso = new Date(congressForm.value.fechaInicioCongreso);
        const fechaSalidaCongreso = new Date(congressForm.value.fechaSalidaCongreso);
        congressForm.value.imgCongreso = this.inputImageUser.nativeElement.value;


        if (congressForm.value.idCongreso == null) {

          congressForm.value.userUid = this.userUid;
          congressForm.value.fechaInicioCongreso = fechaEntradaCongreso;
          congressForm.value.fechaSalidaCongreso = fechaSalidaCongreso;
          this.dataCongress.addCongress(congressForm.value);

        } else {
          congressForm.value.fechaInicioCongreso = fechaEntradaCongreso;
          congressForm.value.fechaSalidaCongreso = fechaSalidaCongreso;
          this.dataCongress.updateCongress(congressForm.value);

        }
        break;

      case 'sinoptico':
        congressForm.value.imgSinaptico = this.inputImageUser.nativeElement.value;
        congressForm.value.nombreCongreso = this.nombreCongresoSeleccionado;
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

      case 'equipamiento':
        congressForm.value.nombreCongreso = this.nombreCongresoSeleccionado;

        if (congressForm.value.idEquipamiento == null) {
          // POST
          // Obtenemos y almacenamos el id del usuario y la disponibilidad la igualamos a la cantidad.
          congressForm.value.userUid = this.userUid;
          congressForm.value.disponibles = congressForm.value.cantidad;

          this.dataEquipment.addEquipment(congressForm.value);

        } else {
          // PUT
          this.dataEquipment.updateEquipment(congressForm.value);
        }
        break;

      case 'invitado':

        congressForm.value.nombreCongreso = this.nombreCongresoSeleccionado;

        if (congressForm.value.idInvitado == null) {

          congressForm.value.userUid = this.userUid;
          this.dataGuest.addGuest(congressForm.value);

        } else {

          this.dataGuest.updateGuest(congressForm.value);

        }
        break;

      case 'sala':

        congressForm.value.nombreCongreso = this.nombreCongresoSeleccionado;

        if (congressForm.value.id == null) {
          // POST
          // Obtenemos y almacenamos el id del usuario.
          congressForm.value.userUid = this.userUid;
          this.dataRoom.addRoom(congressForm.value);

        } else {
          // PUT
          this.dataRoom.updateRoom(congressForm.value);
        }
        break;

      case 'roomEquipment':

          if (congressForm.value.id == null) {
          // POST
          // Obtenemos y almacenamos el id del usuario.
          congressForm.value.userUid = this.userUid;
          congressForm.value.nombreSala = this.nombreSalaSeleccionado;
          this.dataRoomEquipment.addSubfamily(congressForm.value);

        } else {
          // PUT
            // tslint:disable-next-line:radix
            const cantidadOriginal = parseInt(localStorage.getItem('cantidadOriginal'));
            let cantidadTotal = 0;
            if (congressForm.value.cantidad > cantidadOriginal) {

              cantidadTotal = congressForm.value.cantidad - cantidadOriginal;
              this.updateEquipment(this.idEquipamiento, cantidadTotal, 'restar');
              this.dataRoomEquipment.updateSubfamily(congressForm.value);

            } else if (congressForm.value.cantidad < cantidadOriginal) {
              cantidadTotal = cantidadOriginal - congressForm.value.cantidad;
              this.updateEquipment(this.idEquipamiento, cantidadTotal, 'sumar');
              this.dataRoomEquipment.updateSubfamily(congressForm.value);
            }

            localStorage.removeItem('cantidadOriginal');
        }
          break;
      case 'evento':

        // Convertir la fecha de entrada y salida para Firebase.
        const fechaEntrada = new Date(congressForm.value.start);
        const fechaSalida = new Date(congressForm.value.end);

        if (congressForm.value.idEvent == null) {
          // POST
          // Obtenemos y almacenamos el id del usuario.
          congressForm.value.userUid = this.userUid;
          congressForm.value.start = fechaEntrada;
          congressForm.value.end = fechaSalida;
          congressForm.value.resourceId = this.nombreSalaSeleccionado;
          congressForm.value.nombreCongreso = this.nombreCongresoSeleccionado;


          this.dataEvent.addEvent(congressForm.value);

        } else {
          // PUT
          this.dataEvent.updateEvent(congressForm.value);
        }
        break;
    }

    // Limpiamos el formulario.
    congressForm.resetForm();

    // Eventos de cerrar el botón cuando guarde.
    this.btnCloseCongreso.nativeElement.click();
    this.btnCloseInvitado.nativeElement.click();
    this.btnCloseSinaptic.nativeElement.click();
    this.btnCloseRoom.nativeElement.click();
    this.btnCloseCongreso.nativeElement.click();
    this.btnCloseUpdateRoomEquipment.nativeElement.click();
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

  updateEquipment(idEquipamiento, cantidad, condicion): void {
    let contador = 0;

    this.dataEquipment.getOneEquipment(idEquipamiento, cantidad, condicion).subscribe(equipment => {
      this.uniqueEquipments = equipment;

      if (contador === 0) {
        this.dataEquipment.updateEquipment(this.uniqueEquipments);
        contador++;
      }
    });
  }
}
