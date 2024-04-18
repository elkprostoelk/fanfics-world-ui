import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {PasswordModule} from "primeng/password";
import {AuthService} from "../../services/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {MessageService} from "primeng/api";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    CalendarModule,
    PasswordModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {
  registerForm: UntypedFormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', Validators.required],
    role: ['User', Validators.required]
  });
  readonly inputStyles = {
    'margin': '0 .5rem'
  };
  readonly maxDate: Date = new Date();
  readonly roles: string[] = ['User', 'Admin'];
  formFieldStyles: { [key: string]: string } = {'width': '100%'};
  constructor(
    private readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService) {}

  registerUser(value: {
    userName: string,
    password: string,
    email: string,
    dateOfBirth: Date,
    role: string
  }) {
    this.authService.registerUser({
      userName: value.userName,
      password: value.password,
      email: value.email,
      dateOfBirth: value.dateOfBirth.toISOString().slice(0, value.dateOfBirth.toISOString().indexOf('T')),
      role: value.role
    }).subscribe({
        next: () => {
          this.messageService.add({
            summary: 'Sign up is successful!',
            severity: 'success'
          });
          this.router.navigateByUrl('/');
        },
        error: () => this.messageService.add({
          summary: 'Error when signing up!',
          severity: 'error'
        })
      });
  }
}
