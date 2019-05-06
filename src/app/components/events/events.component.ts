import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {EventInterface} from '../../models/events';
import {FullCalendarComponent} from '@fullcalendar/angular';

// Librería de plugins.
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Región del calendario - En este caso español.
import esLocale from '@fullcalendar/core/locales/es';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  // Componentes
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  // the #calendar in the template

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  locale = esLocale;

  // Usuarios de los roles.
  public isAdmin: any = null;
  public userUid: string = null;

  constructor(private service: CalendarService, public dataApi: CalendarService, private authService: AuthService) {}

  // Ignoramos los errores que muestre en Webstorm, en caso contrario no mostrará las listas de los libros.
  calendarEvents: EventInterface[];

  ngOnInit() {
    this.getListCongress();
    this.getCurrentUser();
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

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  getListCongress() {
    this.dataApi.getAllCongress().subscribe(event => {
      this.calendarEvents = event;
    });
  }

  onDeleteEvent(idEvent: string): void {
    const confirmacion = confirm('¿Deseas eliminar este evento?');

    if (confirmacion) {
      this.dataApi.deleteEvent(idEvent);
    }
  }

  onPreUpdateEvent(congres: EventInterface) {
    this.dataApi.selectedCongreso = Object.assign({}, congres);
  }
}
