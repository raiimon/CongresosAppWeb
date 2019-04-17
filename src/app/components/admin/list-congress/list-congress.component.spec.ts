import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongressComponent } from './list-congress.component';

describe('ListCongressComponent', () => {
  let component: ListCongressComponent;
  let fixture: ComponentFixture<ListCongressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCongressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCongressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
