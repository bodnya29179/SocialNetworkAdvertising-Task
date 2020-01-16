import { TestBed } from '@angular/core/testing';

import { CountryAudienceService } from './country-audience.service';

describe('CountryAudienceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryAudienceService = TestBed.get(CountryAudienceService);
    expect(service).toBeTruthy();
  });
});
