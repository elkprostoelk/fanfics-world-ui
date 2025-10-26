import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFanfic } from './add-fanfic';

describe('AddFanfic', () => {
  let component: AddFanfic;
  let fixture: ComponentFixture<AddFanfic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFanfic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFanfic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
