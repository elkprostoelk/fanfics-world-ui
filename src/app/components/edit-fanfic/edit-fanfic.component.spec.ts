import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFanficComponent } from './edit-fanfic.component';

describe('EditFanficComponent', () => {
  let component: EditFanficComponent;
  let fixture: ComponentFixture<EditFanficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFanficComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFanficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
