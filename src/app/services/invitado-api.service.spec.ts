import { TestBed } from '@angular/core/testing';

import { InvitadoApiService } from './invitado-api.service';

describe('InvitadoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvitadoApiService = TestBed.get(InvitadoApiService);
    expect(service).toBeTruthy();
  });
});
