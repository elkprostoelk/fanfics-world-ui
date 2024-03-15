import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficItemComponent } from './fanfic-item.component';

describe('FanficItemComponent', () => {
  let component: FanficItemComponent;
  let fixture: ComponentFixture<FanficItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FanficItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
