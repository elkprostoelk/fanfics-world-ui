import { TestBed } from '@angular/core/testing';

import { FanficService } from './fanfic.service';

describe('Fanfic', () => {
  let service: FanficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
