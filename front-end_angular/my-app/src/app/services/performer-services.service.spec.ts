import { TestBed } from '@angular/core/testing';

import { PerformerServicesService } from './performer-services.service';

describe('PerformerServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerformerServicesService = TestBed.get(PerformerServicesService);
    expect(service).toBeTruthy();
  });
});
