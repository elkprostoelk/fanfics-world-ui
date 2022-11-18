import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFanficComponent } from './add-fanfic.component';

describe('AddFanficComponent', () => {
  let component: AddFanficComponent;
  let fixture: ComponentFixture<AddFanficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFanficComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFanficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
