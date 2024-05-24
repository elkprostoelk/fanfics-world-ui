import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../services/auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-adult-content',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    NgIf
  ],
  templateUrl: './adult-content.component.html',
  styleUrl: './adult-content.component.less'
})
export class AdultContentComponent {
  constructor(
    private readonly authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
}
