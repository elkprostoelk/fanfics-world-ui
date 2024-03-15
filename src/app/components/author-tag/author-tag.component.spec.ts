import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorTagComponent } from './author-tag.component';

describe('AuthorTagComponent', () => {
  let component: AuthorTagComponent;
  let fixture: ComponentFixture<AuthorTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
