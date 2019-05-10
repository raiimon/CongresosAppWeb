import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteriorModalidadesComponent } from './exterior-modalidades.component';

describe('ExteriorModalidadesComponent', () => {
  let component: ExteriorModalidadesComponent;
  let fixture: ComponentFixture<ExteriorModalidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExteriorModalidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExteriorModalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
