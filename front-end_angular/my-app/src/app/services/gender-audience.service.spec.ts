import { TestBed } from '@angular/core/testing';

import { GenderAudienceService } from './gender-audience.service';

describe('GenderAudienceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenderAudienceService = TestBed.get(GenderAudienceService);
    expect(service).toBeTruthy();
  });
});
