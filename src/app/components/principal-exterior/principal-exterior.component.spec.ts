import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalExteriorComponent } from './principal-exterior.component';

describe('PrincipalExteriorComponent', () => {
  let component: PrincipalExteriorComponent;
  let fixture: ComponentFixture<PrincipalExteriorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalExteriorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalExteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
