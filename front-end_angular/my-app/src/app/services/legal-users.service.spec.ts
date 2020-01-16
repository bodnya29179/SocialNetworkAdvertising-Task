import { TestBed } from '@angular/core/testing';

import { LegalUsersService } from './legal-users.service';

describe('LegalUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LegalUsersService = TestBed.get(LegalUsersService);
    expect(service).toBeTruthy();
  });
});
