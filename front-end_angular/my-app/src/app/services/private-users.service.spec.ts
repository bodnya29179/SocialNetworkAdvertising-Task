import { TestBed } from '@angular/core/testing';

import { PrivateUsersService } from './private-users.service';

describe('PrivateUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivateUsersService = TestBed.get(PrivateUsersService);
    expect(service).toBeTruthy();
  });
});
