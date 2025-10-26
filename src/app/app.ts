import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Toast} from 'primeng/toast';
import {Auth} from './services/auth/auth';
import {LoggedInUser} from './models/auth/loggedInUser';
import {Avatar} from 'primeng/avatar';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, RouterLink, Toast, Avatar, Menu, ButtonDirective, ButtonIcon, ButtonLabel],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App implements OnInit {
  userPanelMenuItems: MenuItem[] = [
    { label: 'Log out', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];
  loggedInUser: LoggedInUser | null = null;
  userNameFirstLetter = 'U';

  constructor(
    private readonly authService: Auth,
    private readonly router: Router) {}

  ngOnInit() {
    this.authService.onStartup();
    this.authService.loggedInUser$.subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
      this.userNameFirstLetter = loggedInUser?.name[0].toUpperCase() ?? 'U';
    });
  }

  logout() {
    this.authService.logout();
    if (this.router.url !== '/') {
      this.router.navigate(['/login']).then();
    }
  }
}
