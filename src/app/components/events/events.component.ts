import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';

// Librerías del Calendario.
import {Calendar} from '@fullcalendar/core';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

// Librería del calendario para español.
import esLocale from '@fullcalendar/core/locales/es';
import {CongresoInterface} from '../../models/congreso';
import {EventInterface} from '../../models/events';
import {CalendarService} from '../../services/calendar.service';
import {AuthService} from '../../services/auth.service';
import {CongresoApiService} from '../../services/congreso-api.service';
import 'rxjs-compat/add/operator/map';
import {SalaApiService} from '../../services/sala-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements AfterViewInit, OnInit {

  @ViewChild('fullCalendarInstance') private fullCalendarInstance: any;

  calendarVisible = true;

  // Obtener la hora actual.
  private fechaInicio: any;
  private fechaFin: any;

  // Obtener el congreso
  private congress: CongresoInterface[];

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  calendarEvents: EventInterface[];

  // Obtener el nombre del congreso.
  nombreCongresoSeleccionado: any;

  constructor(public dataApi: CalendarService, public dataRoom: SalaApiService, private authService: AuthService, private dataCongress: CongresoApiService) {}

  ngAfterViewInit() {
   // this.initFullCalendar();
  }

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
  }

  initFullCalendar() {
    // Obtenemos la fecha del congreso.
    this.fechaInicio = localStorage.getItem('congressDateInicio');
    this.fechaFin = localStorage.getItem('congressDateFin');

    this.dataApi.getAllEvents().subscribe(event => {
    this.dataRoom.getAllRooms().subscribe( room => {
      const calendar = new Calendar(this.fullCalendarInstance.nativeElement, {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        plugins: [resourceTimeGridPlugin],
        validRange: {
          start: this.fechaInicio,
          end: this.fechaFin
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
    this.dataApi.getAllEvents().subscribe(event => {
      this.calendarEvents = event;
    });

    this.dataCongress.getAllCongress().subscribe( congreso => {
      this.congress = congreso;
    });
  }

  obtenerNombreCongreso(event: Event) {
    // Obtenemos de la etiqueta.
    const selectedOptions = event.target['options'];

    // Comprobamos el índice.
    const selectedIndex = selectedOptions.selectedIndex;

    // Almacenamos el valor en la variable para después almacenarlo en el formulario de Firebase.
    this.nombreCongresoSeleccionado = selectedOptions[selectedIndex].text;

    // Activamos el calendario.
    this.initFullCalendar();
  }

  onDeleteEvent(idEvent: string): void {
    const confirmacion = confirm('¿Deseas eliminar este evento?');

    if (confirmacion) {
      this.dataApi.deleteEvent(idEvent);
    }
  }

  onPreUpdateEvent(congres: EventInterface) {
    this.dataApi.selectedEvent = Object.assign({}, congres);
  }
}
