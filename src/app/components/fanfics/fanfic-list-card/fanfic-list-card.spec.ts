import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficListCard } from './fanfic-list-card';

describe('FanficListCard', () => {
  let component: FanficListCard;
  let fixture: ComponentFixture<FanficListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanficListCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
