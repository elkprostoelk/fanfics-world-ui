import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fanfics } from './fanfics';

describe('Fanfics', () => {
  let component: Fanfics;
  let fixture: ComponentFixture<Fanfics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fanfics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fanfics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
