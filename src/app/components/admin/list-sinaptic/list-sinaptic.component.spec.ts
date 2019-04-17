import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSinapticComponent } from './list-sinaptic.component';

describe('ListSinapticComponent', () => {
  let component: ListSinapticComponent;
  let fixture: ComponentFixture<ListSinapticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSinapticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSinapticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
