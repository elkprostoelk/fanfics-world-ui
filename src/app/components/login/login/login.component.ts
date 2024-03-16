import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  date: Date = new Date();
  loginForm: UntypedFormGroup = this.formBuilder.group({
    login: ['', [Validators.required, Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]]
  });

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService) {}

  loginUser(value: any) {
    this.authService.loginUser(value.login, value.password)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Logged in successfully!'
          });
          this.router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => this.messageService.add({
          severity: 'error',
          summary: err.message ?? err
        })
      });
  }
}
