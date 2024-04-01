import {Component, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SimpleUserDto} from "../../dto/simpleUserDto";
import {SimpleFandomDto} from "../../dto/simpleFandomDto";
import {TagDto} from "../../dto/tagDto";
import {UserService} from "../../services/user/user.service";
import {FandomService} from "../../services/fandom/fandom.service";
import {FanficsService} from "../../services/fanfics/fanfics.service";
import {TagService} from "../../services/tag/tag.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {map, mergeMap} from "rxjs";
import {FanficDto} from "../../dto/fanficDto";

@Component({
  selector: 'app-edit-fanfic',
  templateUrl: './edit-fanfic.component.html',
  styleUrl: './edit-fanfic.component.less'
})
export class EditFanficComponent implements OnInit {
  fanfic?: FanficDto;
  editingInProgress: boolean = false;
  editFanficForm: UntypedFormGroup = this.builder.group({
    id: ['', Validators.required],
    authorId: ['', Validators.required],
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
    {id: '0', description: 'Original text (written by author)'},
    {id: '1', description: 'Translated (agreed with author)'}
  ];
  readonly fanficRatings = [
    {id: '0', description: 'G'},
    {id: '1', description: 'PG-13'},
    {id: '2', description: 'R'},
    {id: '3', description: 'NC-17'},
    {id: '4', description: 'NC-21'}
  ];
  readonly fanficDirections = [
    {id: '0', description: 'Gen'},
    {id: '1', description: 'Het'},
    {id: '2', description: 'Slash'},
    {id: '3', description: 'FemSlash'},
    {id: '4', description: 'Other'},
    {id: '5', description: 'Mixed'},
    {id: '6', description: 'Article'}
  ];

  constructor(
    private readonly builder: UntypedFormBuilder,
    private readonly userService: UserService,
    private readonly fandomService: FandomService,
    private readonly fanficService: FanficsService,
    private readonly tagService: TagService,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(paramMap => Number(paramMap.get('id'))),
      mergeMap(id => this.fanficService.getFanficInternal(id)))
      .subscribe({
        next: fanfic => {
          this.fanfic = fanfic;
          this.editFanficForm = this.builder.group({
            id: [fanfic.id, Validators.required],
            authorId: [fanfic.author.id, Validators.required],
            title: [fanfic.title, [Validators.required]],
            annotation: [fanfic.annotation],
            text: [fanfic.text, [Validators.required]],
            origin: [fanfic.origin.toString(), [Validators.required]],
            rating: [fanfic.rating.toString(), [Validators.required]],
            direction: [fanfic.direction.toString(), [Validators.required]],
            coauthorIds: [fanfic.coauthors],
            fandomIds: [fanfic.fandoms, [Validators.required]],
            tagIds: [fanfic.tags],
          });
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Error when getting a fanfic!'
        })
      });
  }

  editFanfic() {
    if (this.fanfic) {
      this.editingInProgress = true;
      this.fanficService.editFanfic(this.fanfic?.id, this.editFanficForm.value)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: `Fanfic's successfully been edited!`
            });
            setTimeout(() => this.router.navigateByUrl('/'), 4000);
          },
          error: () => this.messageService.add({
            severity: 'error',
            summary: 'Error when editing a fanfic!'
          }),
          complete: () => this.editingInProgress = false
        });
    }
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

