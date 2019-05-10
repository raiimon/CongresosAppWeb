import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarExteriorComponent } from './navbar-exterior.component';

describe('NavbarExteriorComponent', () => {
  let component: NavbarExteriorComponent;
  let fixture: ComponentFixture<NavbarExteriorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarExteriorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarExteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
