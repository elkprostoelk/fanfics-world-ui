import {Component, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { FanficsService } from "../../services/fanfics/fanfics.service";
import { SimpleUserDto } from "../../dto/simpleUserDto";
import { UserService } from "../../services/user/user.service";
import {SimpleFandomDto} from "../../dto/simpleFandomDto";
import {FandomService} from "../../services/fandom/fandom.service";
import {TagDto} from "../../dto/tagDto";
import {TagService} from "../../services/tag/tag.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'app-add-fanfic',
  templateUrl: './add-fanfic.component.html',
  styleUrls: ['./add-fanfic.component.less'],
})
export class AddFanficComponent implements OnInit {
  addingInProgress: boolean = false;
  addFanficForm: UntypedFormGroup = this.builder.group({
    title: ['', [Validators.required]],
    annotation: [''],
    text: ['', [Validators.required]],
    origin: ['', [Validators.required]],
    rating: ['', [Validators.required]],
    direction: ['', [Validators.required]],
    coauthorIds: [[]],
    fandomIds: [[], [Validators.required]],
    tagIds: [[]],
  });
  coauthors: SimpleUserDto[] = [];
  fandoms: SimpleFandomDto[] = [];
  tags: TagDto[] = [];
  readonly fanficOrigins = [
    { id: '0', description: 'Original text (written by author)' },
    { id: '1', description: 'Translated (agreed with author)' }
  ];
  readonly fanficRatings = [
    { id: '0', description: 'G' },
    { id: '1', description: 'PG-13' },
    { id: '2', description: 'R' },
    { id: '3', description: 'NC-17' },
    { id: '4', description: 'NC-21' }
  ];
  readonly fanficDirections = [
    { id: '0', description: 'Gen' },
    { id: '1', description: 'Het' },
    { id: '2', description: 'Slash' },
    { id: '3', description: 'FemSlash' },
    { id: '4', description: 'Other' },
    { id: '5', description: 'Mixed' },
    { id: '6', description: 'Article' }
  ];

  constructor(
    private readonly builder: UntypedFormBuilder,
    private readonly userService: UserService,
    private readonly fandomService: FandomService,
    private readonly fanficService: FanficsService,
    private readonly tagService: TagService,
    private readonly router: Router,
    private readonly messageService: MessageService
    ) {}

  ngOnInit(): void {

  }

  createFanfic() {
    this.addingInProgress = true;
    this.fanficService.createFanfic(this.addFanficForm.value)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary:  `Fanfic's successfully been added!`
          });
          setTimeout(() => this.router.navigateByUrl('/'), 4000);
        },
        error: (err: HttpErrorResponse) => this.messageService.add({
          severity: 'error',
          summary: err.message
        }),
        complete: () => this.addingInProgress = false
      });
  }

  filterCoauthors($event: AutoCompleteCompleteEvent) {
    this.userService.getUsers($event.query)
      .subscribe({
        next: (users) => this.coauthors = users,
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Could not get users!'
        })
      });
  }

  filterFandoms($event: AutoCompleteCompleteEvent) {
    this.fandomService.getFandomsByTitle($event.query)
      .subscribe({
        next: (fandoms) => this.fandoms = fandoms,
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Could not get fandoms!'
        })
      })
  }

  filterTags($event: AutoCompleteCompleteEvent) {
    this.tagService.getTagsByTitle($event.query)
      .subscribe({
        next: (tags) => this.tags = tags,
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Could not get tags!'
        })
      })
  }
}
