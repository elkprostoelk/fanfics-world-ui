import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficsWorldTagComponent } from './fanfics-world-tag.component';

describe('FanficsWorldTagComponent', () => {
  let component: FanficsWorldTagComponent;
  let fixture: ComponentFixture<FanficsWorldTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficsWorldTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FanficsWorldTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
