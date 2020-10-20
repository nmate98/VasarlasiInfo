import { TestBed } from '@angular/core/testing';

import { VarosokService } from './varosok.service';

describe('VarosokService', () => {
  let service: VarosokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarosokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
