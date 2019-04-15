import { TestBed } from '@angular/core/testing';

import { SesionApiService } from './sesion-api.service';

describe('SesionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SesionApiService = TestBed.get(SesionApiService);
    expect(service).toBeTruthy();
  });
});
