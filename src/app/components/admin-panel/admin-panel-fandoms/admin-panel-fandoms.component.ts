import {Component, OnInit} from '@angular/core';
import {ServicePagedResultDto} from "../../../dto/servicePagedResultDto";
import {AdminPanelFandomDto} from "../../../dto/adminPanelFandomDto";
import {FandomService} from "../../../services/fandom/fandom.service";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {AsyncPipe, NgIf} from "@angular/common";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
    ConfirmDialogModule
  ],
  templateUrl: './admin-panel-fandoms.component.html',
  styleUrl: './admin-panel-fandoms.component.less'
})
export class AdminPanelFandomsComponent implements OnInit {

  searchTerm: string | null = null;
  fandoms: ServicePagedResultDto<AdminPanelFandomDto[]>
    = new ServicePagedResultDto<AdminPanelFandomDto[]>([], 0, 1, 1, 5)
  fandomsTableLoading: boolean = false;

  constructor(private readonly fandomService: FandomService,
              private readonly messageService: MessageService) {}

  ngOnInit() {
    this.getFandoms();
  }

  addNewFandomClick() {

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
    })
  }

  private getFandoms() {
    this.fandomsTableLoading = true;
    this.fandomService.getFandomsForAdminPage()
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
}
