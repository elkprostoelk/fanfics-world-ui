import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficsSearchFiltersComponent } from './fanfics-search-filters.component';

describe('FanficsSearchFiltersComponent', () => {
  let component: FanficsSearchFiltersComponent;
  let fixture: ComponentFixture<FanficsSearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficsSearchFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FanficsSearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
