import { TestBed } from '@angular/core/testing';

import { FandomService } from './fandom.service';

describe('FandomService', () => {
  let service: FandomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FandomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
