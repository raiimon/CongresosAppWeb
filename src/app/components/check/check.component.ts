import { Component } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {

  // Doughnut
  public doughnutChartLabels = ['Asistencia', 'Faltas'];
  public demodoughnutChartData =  [ 650, 350 ];

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

}
