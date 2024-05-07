import {Component, OnInit} from '@angular/core';
import {ServicePagedResultDto} from "../../../dto/servicePagedResultDto";
import {AdminPanelFandomDto} from "../../../dto/adminPanelFandomDto";
import {FandomService} from "../../../services/fandom/fandom.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {AsyncPipe, NgIf, NgStyle} from "@angular/common";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AddNewFandomComponent} from "./add-new-fandom/add-new-fandom.component";

@Component({
  selector: 'app-admin-panel-fandoms',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    TableModule,
    TooltipModule,
    AsyncPipe,
    NgIf,
    ConfirmDialogModule,
    AddNewFandomComponent,
    NgStyle
  ],
  templateUrl: './admin-panel-fandoms.component.html',
  styleUrl: './admin-panel-fandoms.component.less'
})
export class AdminPanelFandomsComponent implements OnInit {
  addDialogVisible: boolean = false;
  searchTerm: string | null = null;
  fandoms: ServicePagedResultDto<AdminPanelFandomDto[]>
    = new ServicePagedResultDto<AdminPanelFandomDto[]>([], 0, 1, 1, 5)
  fandomsTableLoading: boolean = false;

  constructor(private readonly fandomService: FandomService,
              private readonly messageService: MessageService,
              private readonly confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.getFandoms();
  }

  addNewFandomClick() {
    this.addDialogVisible = true;
  }

  refreshFandomsList() {
    this.getFandoms();
  }

  filterByName() {
    this.fandomsTableLoading = true;
    this.fandomService.getFandomsForAdminPage(1, 5, this.searchTerm)
      .subscribe({
        next: result => {
          this.fandoms = result;
          this.fandomsTableLoading = false;
        },
        error: this.errorHandler
      })
  }

  clearFilter() {
    this.searchTerm = null;
    this.getFandoms();
  }

  onDeleteFandomClick(id: number) {
    this.confirmationService.confirm({
      key: 'adminPage',
      message: `Are you sure you want to delete this fandom?`,
      header: 'Confirm deleting the fandom',
      icon: 'pi pi-trash',
      accept: () => this.deleteFandom(id),
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-text'
    });
  }

  pageChangeHandler($event: PaginatorState) {
    this.fandomsTableLoading = true;
    this.fandomService.getFandomsForAdminPage(
      ($event.page ?? 0) + 1,
      $event.rows ?? 5,
      this.searchTerm
    ).subscribe({
      next: result => {
        this.fandoms = result;
        this.fandomsTableLoading = false;
      },
      error: this.errorHandler
    });
  }

  private getFandoms() {
    this.fandomsTableLoading = true;
    this.fandomService.getFandomsForAdminPage(1, 5, this.searchTerm)
      .subscribe({
        next: result => {
          this.fandoms = result;
          this.fandomsTableLoading = false;
        },
        error: this.errorHandler
      });
  }

  private errorHandler = () => this.messageService.add({
    severity: 'error',
    summary: 'Failed to get fandoms!'
  });

  private deleteFandom(id: number) {
    this.fandomService.deleteFandom(id)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Fandom has successfully been deleted!'
          });
          this.getFandoms();
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Failed to delete a fandom!'
        })
      });
  }

  onFandomAdded() {
    this.getFandoms();
  }
}
