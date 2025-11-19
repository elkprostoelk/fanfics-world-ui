import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {FanficDirection} from '../../models/fanfics/fanficDirection';
import {FanficRating} from '../../models/fanfics/fanficRating';
import {Select} from 'primeng/select';
import {FanficService} from '../../services/fanfic/fanfic.service';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth/auth.service';
import {LookupsService} from '../../services/lookups/lookups.service';

@Component({
  selector: 'app-add-fanfic',
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    ButtonLabel,
    InputText,
    Textarea,
    Select
  ],
  templateUrl: './add-fanfic.html',
  styleUrl: './add-fanfic.less'
})
export class AddFanfic implements OnInit {
  addFanficForm: UntypedFormGroup = new UntypedFormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.maxLength(1000)]),
    direction: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
  });
  isLoading = false;
  directions: { key: FanficDirection, value: string }[] = [];
  ratings: { key: FanficRating, value: string }[] = [];

  constructor(
    private readonly router: Router,
    private readonly fanficService: FanficService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly lookupsService: LookupsService ) {}

  ngOnInit() {
    this.directions = this.lookupsService.directions;
    this.ratings = this.lookupsService.ratings;
    this.authService.loggedInUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']).then();
      }
    })
  }

  addFanfic() {
    this.isLoading = true;
    this.fanficService.addFanfic(this.addFanficForm.value)
      .subscribe({
        next: (fanficId) => {
          this.isLoading = false;
          this.router.navigate(['/']).then();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Fanfic adding failed',
            detail: err?.title ?? 'Failed to add a fanfic. Please check your data.',
          });
          this.isLoading = false;
        }
      });
  }
}
