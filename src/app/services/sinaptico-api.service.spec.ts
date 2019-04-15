import { TestBed } from '@angular/core/testing';

import { SinapticoApiService } from './sinaptico-api.service';

describe('SinapticoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SinapticoApiService = TestBed.get(SinapticoApiService);
    expect(service).toBeTruthy();
  });
});
