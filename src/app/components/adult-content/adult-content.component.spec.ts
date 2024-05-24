import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultContentComponent } from './adult-content.component';

describe('AdultContentComponent', () => {
  let component: AdultContentComponent;
  let fixture: ComponentFixture<AdultContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdultContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdultContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
