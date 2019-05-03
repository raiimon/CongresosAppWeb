import { Component, OnInit } from '@angular/core';
import {SinapticoApiService} from '../../services/sinaptico-api.service';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-sinaptic',
  templateUrl: './sinaptic.component.html',
  styleUrls: ['./sinaptic.component.css']
})
export class SinapticComponent implements OnInit {

  constructor(private auth: CalendarService) { }

  ngOnInit() {
  }

}
