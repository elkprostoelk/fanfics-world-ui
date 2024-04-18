import {Component, OnInit, ViewChild} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {AdminPanelUsersComponent} from "./admin-panel-users/admin-panel-users.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    TabViewModule,
    AdminPanelUsersComponent,
    NgIf
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.less'
})
export class AdminPanelComponent implements OnInit {

  @ViewChild('usersTab') usersTab?: AdminPanelUsersComponent;
  constructor(readonly authService: AuthService,
              private readonly router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated ||
      !this.authService.isInRole('Admin')) {
      this.router.navigateByUrl('/');
    }
  }

  onActiveTabChange(tabIndex: number) {
    switch (tabIndex)
    {
      case 0:
        this.usersTab?.ngOnInit();
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }
}
