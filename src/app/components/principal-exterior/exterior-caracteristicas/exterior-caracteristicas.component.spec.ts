import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteriorCaracteristicasComponent } from './exterior-caracteristicas.component';

describe('ExteriorCaracteristicasComponent', () => {
  let component: ExteriorCaracteristicasComponent;
  let fixture: ComponentFixture<ExteriorCaracteristicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExteriorCaracteristicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExteriorCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
