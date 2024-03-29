import {Component, EventEmitter, Output} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {SimpleFandomDto} from "../../../dto/simpleFandomDto";
import {FandomService} from "../../../services/fandom/fandom.service";
import {MessageService} from "primeng/api";
import {TagService} from "../../../services/tag/tag.service";
import {TagDto} from "../../../dto/tagDto";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {KeyValuePipe} from "@angular/common";
import {SearchFanficsDto} from "../../../dto/searchFanficsDto";

@Component({
  selector: 'app-fanfics-search-filters',
  standalone: true,
  imports: [
    InputTextModule,
    AutoCompleteModule,
    PaginatorModule,
    ReactiveFormsModule,
    CheckboxModule,
    ButtonModule,
    PanelModule,
    KeyValuePipe
  ],
  templateUrl: './fanfics-search-filters.component.html',
  styleUrl: './fanfics-search-filters.component.less'
})
export class FanficsSearchFiltersComponent {
  @Output()
  onPerformSearch: EventEmitter<any> = new EventEmitter<any>();
  fandoms: SimpleFandomDto[] = [];
  tags: TagDto[] = [];
  collapsed: boolean = true;
  sortByOptions: {key: string, value: string}[] = [
    {key: 'creationDate', value: 'Creation date'},
    {key: 'title', value: 'Title'}
  ];
  sortOrderOptions: {key: string, value: string}[] = [
    { key: 'ascending', value: 'Ascending'},
    { key: 'descending', value: 'Descending'}
  ];
  searchFanficsForm: UntypedFormGroup = this.generateFormGroup;

  constructor(private readonly fandomService: FandomService,
              private readonly tagService: TagService,
              private readonly messageService: MessageService,
              private readonly fb: FormBuilder) {
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

  searchFanfics() {
    let {searchByTitle, fandoms, tags, directions, origins, statuses, ratings, sortBy, sortOrder} = this.searchFanficsForm.value;
    let searchParams: SearchFanficsDto = {
      fandomIds: fandoms.map((f: SimpleFandomDto) => f.id),
      tagIds: tags.map((t: TagDto) => t.id),
      searchByTitle: searchByTitle,
      directions: Object.keys(directions).filter(d => directions[d]).join(','),
      ratings: Object.keys(ratings).filter(r => ratings[r]).join(','),
      origins: Object.keys(origins).filter(o => origins[o]).join(','),
      statuses: Object.keys(statuses).filter(d => statuses[d]).join(','),
      sortBy: sortBy,
      sortOrder: sortOrder
    };
    this.onPerformSearch.emit(searchParams);
  }

  resetFilters() {
    this.searchFanficsForm = this.generateFormGroup;
  }

  private get generateFormGroup(): UntypedFormGroup {
    return this.fb.group({
      searchByTitle: ['', Validators.maxLength(100)],
      fandoms: [[]],
      tags: [[]],
      origins: this.fb.group({
        'OriginalText': [false],
        'Translation': [false]
      }),
      directions: this.fb.group({
        'Gen': [false],
        'Het': [false],
        'Slash': [false],
        'Femslash': [false],
        'Mixed': [false],
        'Article': [false],
        'Other': [false],
      }),
      ratings: this.fb.group({
        'G': [false],
        'PG-13': [false],
        'R': [false],
        'NC-17': [false],
        'NC-21': [false]
      }),
      statuses: this.fb.group({
        'InProgress': [false],
        'Finished': [false],
        'Frozen': [false]
      }),
      sortBy: [''],
      sortOrder: ['']
    });
  }
}
