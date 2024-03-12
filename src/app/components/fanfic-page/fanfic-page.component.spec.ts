import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficPageComponent } from './fanfic-page.component';

describe('FanficPageComponent', () => {
  let component: FanficPageComponent;
  let fixture: ComponentFixture<FanficPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanficPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FanficPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
