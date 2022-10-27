import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {AppToastService} from "../../../services/app-toast/app-toast.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  date: Date = new Date();
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: AppToastService) {
    this.loginForm = formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]]
    });
  }

  loginUser(value: any) {
    this.authService.loginUser(value.login, value.password)
      .subscribe({
        next: () => {
          this.toastService.show('Success!', 'Logged in successfully!');
          this.router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.show('Error!', err.error);
        }
      });
  }
}
