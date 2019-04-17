import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinapticComponent } from './sinaptic.component';

describe('SinapticComponent', () => {
  let component: SinapticComponent;
  let fixture: ComponentFixture<SinapticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinapticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinapticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
