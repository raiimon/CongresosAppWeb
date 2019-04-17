import { Component, OnInit } from '@angular/core';
import {SinapticoApiService} from '../../services/sinaptico-api.service';

@Component({
  selector: 'app-sinaptic',
  templateUrl: './sinaptic.component.html',
  styleUrls: ['./sinaptic.component.css']
})
export class SinapticComponent implements OnInit {

  constructor(private dataApi: SinapticoApiService) { }

  public sinaptics = [];
  public sinaptic = '';

  ngOnInit() {
    this.dataApi.getAllSinaptics().subscribe(sinaptico => {
      this.sinaptics = sinaptico;
    });
  }

}
