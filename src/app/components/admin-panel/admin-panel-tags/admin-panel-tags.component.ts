import {Component, OnInit} from '@angular/core';
import {TagService} from "../../../services/tag/tag.service";
import {ServicePagedResultDto} from "../../../dto/servicePagedResultDto";
import {AdminPanelTagDto} from "../../../dto/adminPanelTagDto";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {AddNewFandomComponent} from "../admin-panel-fandoms/add-new-fandom/add-new-fandom.component";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {AddNewTagComponent} from "./add-new-tag/add-new-tag.component";
import {NgStyle} from "@angular/common";

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
    AddNewTagComponent,
    NgStyle
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
              private readonly messageService: MessageService,
              private readonly confirmationService: ConfirmationService) {}

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
    this.confirmationService.confirm({
      key: 'adminPage',
      message: `Are you sure you want to delete this tag?`,
      header: 'Confirm deleting the tag',
      icon: 'pi pi-trash',
      accept: () => this.deleteTag(id),
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-text'
    });
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

  private deleteTag(id: number) {
    this.tagService.deleteTag(id)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully deleted a tag!'
          });
          this.getTags();
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Failed to delete a tag!'
        })
      });
  }

  private errorHandler = () => this.messageService.add({
    severity: 'error',
    summary: 'Failed to get tags!',
  });
}
