import { TestBed } from '@angular/core/testing';

import { SalaApiService } from './sala-api.service';

describe('SalaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaApiService = TestBed.get(SalaApiService);
    expect(service).toBeTruthy();
  });
});
