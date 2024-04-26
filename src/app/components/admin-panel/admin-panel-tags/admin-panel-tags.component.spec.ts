import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelTagsComponent } from './admin-panel-tags.component';

describe('AdminPanelTagsComponent', () => {
  let component: AdminPanelTagsComponent;
  let fixture: ComponentFixture<AdminPanelTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPanelTagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPanelTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
