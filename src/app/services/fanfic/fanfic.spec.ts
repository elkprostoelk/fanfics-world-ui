import { TestBed } from '@angular/core/testing';

import { Fanfics } from './fanfic';

describe('Fanfic', () => {
  let service: Fanfics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fanfics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
