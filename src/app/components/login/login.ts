import {Component, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {Password} from 'primeng/password';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {Auth} from '../../services/auth/auth';
import {MessageService} from 'primeng/api';
import {decodeToken} from '../../auth-interceptor/auth-interceptor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    InputText,
    ReactiveFormsModule,
    Password,
    ButtonDirective,
    ButtonLabel
  ],
  templateUrl: './login.html',
  styleUrl: './login.less'
})
export class Login implements OnInit {
  isLoading = false;
  loginForm = new UntypedFormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.max(256)]),
    password: new FormControl('', [Validators.required, Validators.max(20)]),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: Auth,
    private readonly messageService: MessageService,
    private readonly router: Router) {}

  ngOnInit() {
    this.authService.loggedInUser$.subscribe(loggedInUser => {
      if (loggedInUser) {
        this.router.navigate(['/']).then();
      }
    })
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: token => {
          localStorage.setItem('access_token', token);
          this.authService.loggedInUser$.next(decodeToken(token));
          this.isLoading = false;
          this.router.navigate(['/']).then();
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login failed',
            detail: err?.title ?? 'Failed to log in. Please check your data.',
          });
          this.authService.loggedInUser$.next(null);
          this.isLoading = false;
        }
      });
  }
}
