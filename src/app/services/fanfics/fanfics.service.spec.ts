import { TestBed } from '@angular/core/testing';

import { FanficsService } from './fanfics.service';

describe('FanficsService', () => {
  let service: FanficsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanficsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
