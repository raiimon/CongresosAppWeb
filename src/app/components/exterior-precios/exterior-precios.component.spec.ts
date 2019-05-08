import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteriorPreciosComponent } from './exterior-precios.component';

describe('ExteriorPreciosComponent', () => {
  let component: ExteriorPreciosComponent;
  let fixture: ComponentFixture<ExteriorPreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExteriorPreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExteriorPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
