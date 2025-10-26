import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {FanficDirection} from '../../models/fanfics/fanficDirection';
import {FanficRating} from '../../models/fanfics/fanficRating';
import {Select} from 'primeng/select';
import {Fanfics} from '../../services/fanfic/fanfic';
import {MessageService} from 'primeng/api';
import {Auth} from '../../services/auth/auth';

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
  directions = [
    { key: FanficDirection.NotDefined, value: 'Not Defined' },
    { key: FanficDirection.Gen, value: 'Gen' },
    { key: FanficDirection.Het, value: 'Het' },
    { key: FanficDirection.Slash, value: 'Slash' },
    { key: FanficDirection.Femslash, value: 'Femslash' },
    { key: FanficDirection.Other, value: 'Other' },
    { key: FanficDirection.Mixed, value: 'Mixed' },
    { key: FanficDirection.Article, value: 'Article' },
  ];
  ratings = [
    { key: FanficRating.G, value: 'G' },
    { key: FanficRating.Pg13, value: 'PG-13' },
    { key: FanficRating.R, value: 'R' },
    { key: FanficRating.Nc17, value: 'NC-17' },
    { key: FanficRating.Nc21, value: 'NC-21' },
  ];

  constructor(
    private readonly router: Router,
    private readonly fanficsService: Fanfics,
    private readonly messageService: MessageService,
    private readonly authService: Auth) {}

  ngOnInit() {
    this.authService.loggedInUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']).then();
      }
    })
  }

  addFanfic() {
    this.isLoading = true;
    this.fanficsService.addFanfic(this.addFanficForm.value)
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
