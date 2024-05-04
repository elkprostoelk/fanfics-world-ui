import {Component, OnInit} from '@angular/core';
import {TagService} from "../../../services/tag/tag.service";
import {ServicePagedResultDto} from "../../../dto/servicePagedResultDto";
import {AdminPanelTagDto} from "../../../dto/adminPanelTagDto";
import {MessageService, SharedModule} from "primeng/api";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {AddNewFandomComponent} from "../admin-panel-fandoms/add-new-fandom/add-new-fandom.component";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {AddNewTagComponent} from "./add-new-tag/add-new-tag.component";

@Component({
  selector: 'app-admin-panel-tags',
  standalone: true,
  imports: [
    AddNewFandomComponent,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    TooltipModule,
    AddNewTagComponent
  ],
  templateUrl: './admin-panel-tags.component.html',
  styleUrl: './admin-panel-tags.component.less'
})
export class AdminPanelTagsComponent implements OnInit {
  addDialogVisible: boolean = false;
  searchTerm: string | null = null;
  tags: ServicePagedResultDto<AdminPanelTagDto[]>
    = new ServicePagedResultDto<AdminPanelTagDto[]>([], 0, 1, 1, 5)
  tagsTableLoading: boolean = false;

  constructor(private readonly tagService: TagService,
              private readonly messageService: MessageService) {}

  ngOnInit() {
    this.getTags();
  }

  addNewTagClick() {
    this.addDialogVisible = true;
  }

  refreshTagsList() {
    this.getTags();
  }

  filterByName() {
    this.tagsTableLoading = true;
    this.tagService.getTagsForAdminPage(this.searchTerm, 1, 5)
      .subscribe({
        next: result => {
          this.tags = result;
          this.tagsTableLoading = false;
        },
        error: this.errorHandler
      })
  }

  clearFilter() {
    this.searchTerm = null;
    this.getTags();
  }

  onDeleteTagClick(id: number) {

  }

  pageChangeHandler($event: PaginatorState) {
    this.tagsTableLoading = true;
    this.tagService.getTagsForAdminPage(
      this.searchTerm,
      ($event.page ?? 0) + 1,
      $event.rows ?? 5
    ).subscribe({
      next: result => {
        this.tags = result;
        this.tagsTableLoading = false;
      },
      error: this.errorHandler
    });
  }

  onTagAdded() {
    this.getTags();
  }

  private getTags() {
    this.tagsTableLoading = true;
    this.tagService.getTagsForAdminPage(this.searchTerm)
      .subscribe({
        next: (result) => {
          this.tags = result;
          this.tagsTableLoading = false;
        },
        error: this.errorHandler
      });
  }

  private errorHandler = () => this.messageService.add({
    severity: 'error',
    summary: 'Failed to get tags!',
  });
}
