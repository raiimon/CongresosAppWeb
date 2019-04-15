import { TestBed } from '@angular/core/testing';

import { CongresoApiService } from './congreso-api.service';

describe('CongresoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CongresoApiService = TestBed.get(CongresoApiService);
    expect(service).toBeTruthy();
  });
});
