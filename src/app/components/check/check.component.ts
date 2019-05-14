import { Component, OnInit} from '@angular/core';
import {InvitadoApiService} from '../../services/invitado-api.service';
import {SalaApiService} from '../../services/sala-api.service';
import {SalaInterface} from '../../models/sala';
import {Router} from '@angular/router';
import {InvitadoInterface} from '../../models/invitado';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor(private dataApi: InvitadoApiService, private dataRoom: SalaApiService) {}

  // Almacenamos las salas en las que el usuario este.
  private rooms: SalaInterface[];

  // Variables temporales para crear los valores de las salas.
  private asistencia: any;
  private faltas: any;

  // Doughnut
  public doughnutChartLabels = ['Asistencia', 'Faltas'];
  public demodoughnutChartData: [number, number];
  public demodoughnutChartDataPrincipal = [670, 230];

  // Color del chart
  private donutColors = [
    {
      backgroundColor: [
        'rgba(0, 148, 97, 1)',
        'rgba(255, 0, 0, 1)',
      ]
    }
  ];

  // Tipo de chart.
  public doughnutChartType = 'doughnut';

  ngOnInit() {
    this.getAllRooms();
    this.getRandomNumber();
  }

  getAllRooms() {
    this.dataRoom.getAllRooms().subscribe(salas => {
      this.rooms = salas;
    });
  }

  // Función temporal que almacena números al azar para los charts
  getRandomNumber() {
    this.asistencia = Math.floor(Math.random() * (999 - 100));
    this.faltas = Math.floor(Math.random() * (425 - 100));

    this.demodoughnutChartData = [ this.asistencia, this.faltas ];
  }
}
