import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFandomComponent } from './add-new-fandom.component';

describe('AddNewFandomComponent', () => {
  let component: AddNewFandomComponent;
  let fixture: ComponentFixture<AddNewFandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewFandomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewFandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
