import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';

// Librerías del Calendario.
import {Calendar} from '@fullcalendar/core';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

// Librería del calendario para español.
import esLocale from '@fullcalendar/core/locales/es';
import {CongresoInterface} from '../../models/congreso';
import {EventInterface} from '../../models/events';
import {CalendarService} from '../../services/calendar.service';
import { AuthenticationService } from '../../services/auth.service';
import {CongresoApiService} from '../../services/congreso-api.service';
import 'rxjs-compat/add/operator/map';
import {SalaApiService} from '../../services/sala-api.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {

  @ViewChild('fullCalendarInstance') private fullCalendarInstance: any;

  // Obtener el congreso
  private congress: CongresoInterface[];
  private uniqueCongress: CongresoInterface ;

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  calendarEvents: EventInterface[];

  // Obtener el nombre del congreso.
  nombreCongresoSeleccionado: any;
  idCongresoSeleccionado: any;

  constructor(public dataApi: CalendarService,
              public dataRoom: SalaApiService,
              private authService: AuthenticationService,
              private dataCongress: CongresoApiService) {}

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
    this.fullCalendarInstance.nativeElement.innerHTML = '';
  }

  initFullCalendar(fechaInicio, fechaFin) {

    this.dataApi.getAllEvents().subscribe(event => {
    this.dataRoom.getAllRooms().subscribe( room => {
      console.log('salas', room);
      console.log('eventos', event);
      const calendar = new Calendar(this.fullCalendarInstance.nativeElement, {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        plugins: [resourceTimeGridPlugin],
        validRange: {
          start: fechaInicio,
          end: fechaFin
        },
        firstDay: 1,
        locale: esLocale,
        defaultView: 'resourceTimeGridDay',
        resources: room,
        events: event
      });

      calendar.render();
    });
    });
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

  getListCongress() {
    // Obtenemos todos los congresos para el option.
    this.dataCongress.getAllCongress().subscribe( congreso => {
      this.congress = congreso;
    });
  }

  obtenerNombreCongreso(event: Event) {

    let fechaInicio: any = '';
    let fechaFin: any = '';

    // Obtenemos de la etiqueta.
    const selectedOptions = event.target['options'];

    // Comprobamos el índice.
    const selectedIndex = selectedOptions.selectedIndex;

    // Almacenamos el valor en la variable para después almacenarlo en el formulario de Firebase.
    this.nombreCongresoSeleccionado = selectedOptions[selectedIndex].text;
    this.idCongresoSeleccionado = selectedOptions[selectedIndex].value;

    this.dataCongress.getOneCongress(this.idCongresoSeleccionado).subscribe( congresoUnico => {
      this.uniqueCongress = congresoUnico;

      // Obtenemos la fecha del congreso.
      fechaInicio = localStorage.getItem('congressDateInicio');
      fechaFin = localStorage.getItem('congressDateFin');

      // Activamos el calendario.
      this.initFullCalendar(fechaInicio, fechaFin);
    });

    // Refrescamos el calendario.
    this.fullCalendarInstance.nativeElement.innerHTML = '';

    // Vamos a mostrar los eventos según el congreso.
    this.getEvents(this.nombreCongresoSeleccionado);

  }

  getEvents(nombreCongreso) {
    localStorage.setItem('nombreCongresoEvent', nombreCongreso);

    // Obtenemos todos los eventos.
    this.dataApi.getAllEvents().subscribe(event => {
      this.calendarEvents = event;
    });
  }

  onDeleteEvent(idEvent: string): void {
    const confirmacion = confirm('¿Deseas eliminar este evento?');

    if (confirmacion) {
      this.dataApi.deleteEvent(idEvent);
      this.ngOnInit();
    }
  }

  onPreUpdateEvent(congres: EventInterface) {
    this.dataApi.selectedEvent = Object.assign({}, congres);
    this.ngOnInit();
  }
}
