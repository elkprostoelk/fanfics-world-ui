import {Component, OnInit} from '@angular/core';
import {Auth} from '../../services/auth/auth';
import {FormControl, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Textarea} from 'primeng/textarea';
import {DatePicker} from 'primeng/datepicker';
import {Router} from '@angular/router';
import {RegisterForm} from '../../models/auth/registerForm';
import {RegisterRequest} from '../../models/auth/registerRequest';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    ButtonLabel,
    InputText,
    Password,
    Textarea,
    DatePicker
  ],
  templateUrl: './register.html',
  styleUrl: './register.less'
})
export class Register implements OnInit {
  registerForm: UntypedFormGroup = new UntypedFormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255)]),
    bio: new FormControl('', [Validators.maxLength(1000)]),
    birthDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)])
  });
  isLoading = false;
  minDate = new Date('1900-01-01');
  maxDate = new Date();

  constructor(
    private readonly authService: Auth,
    private readonly router: Router,
    private readonly messageService: MessageService) {}

  ngOnInit() {
    this.authService.loggedInUser$.subscribe({
      next: loggedInUser => {
        if (loggedInUser) {
          this.router.navigate(['/']).then();
        }
      }
    })
  }

  register() {
    this.isLoading = true;
    const formValue = this.registerForm.value as RegisterForm;
    const request = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      bio: formValue.bio,
      birthDate: formValue.birthDate.toISOString().split('T')[0]
    } as RegisterRequest;

    this.authService.register(request).subscribe({
      next: () => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'A new user has been registered!',
        });
        this.router.navigate(['/login']).then();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration failed',
          detail: error?.title ?? 'Failed to register. Please check your data.',
        });
        this.isLoading = false;
      }
    });
  }
}
