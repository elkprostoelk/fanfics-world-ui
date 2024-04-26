import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelFandomsComponent } from './admin-panel-fandoms.component';

describe('AdminPanelFandomsComponent', () => {
  let component: AdminPanelFandomsComponent;
  let fixture: ComponentFixture<AdminPanelFandomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPanelFandomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPanelFandomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
