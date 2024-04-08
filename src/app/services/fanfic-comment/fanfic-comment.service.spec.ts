import { TestBed } from '@angular/core/testing';

import { FanficCommentService } from './fanfic-comment.service';

describe('FanficCommentService', () => {
  let service: FanficCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FanficCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
