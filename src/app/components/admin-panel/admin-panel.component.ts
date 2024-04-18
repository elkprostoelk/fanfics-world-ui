import {Component, OnInit} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {AdminPanelUsersComponent} from "./admin-panel-users/admin-panel-users.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    TabViewModule,
    AdminPanelUsersComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.less'
})
export class AdminPanelComponent implements OnInit {
  constructor(readonly authService: AuthService,
              private readonly router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated ||
      !this.authService.isInRole('Admin')) {
      this.router.navigateByUrl('/');
    }
  }
}
