import { Component } from '@angular/core';
import { LoadingSpinnersService } from 'ngx-loading-spinners';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CongresosApp2019';

  constructor(
    private spinnersService: LoadingSpinnersService
  ) {
    spinnersService.defaultSpinnerFilePath = '/assets/img/imgError.jpeg';
  }
}
