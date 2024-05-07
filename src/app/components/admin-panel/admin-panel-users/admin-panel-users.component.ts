import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {AdminPanelUserDto} from "../../../dto/adminPanelUserDto";
import {UserService} from "../../../services/user/user.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AsyncPipe, DatePipe, NgIf, NgStyle} from "@angular/common";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {ServicePagedResultDto} from "../../../dto/servicePagedResultDto";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../../services/auth/auth.service";
import {map, Observable} from "rxjs";
import {TooltipModule} from "primeng/tooltip";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {Router} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-admin-panel-users',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    AsyncPipe,
    PaginatorModule,
    ButtonModule,
    NgIf,
    TooltipModule,
    ConfirmDialogModule,
    InputTextModule,
    NgStyle
  ],
  templateUrl: './admin-panel-users.component.html',
  styleUrl: './admin-panel-users.component.less'
})
export class AdminPanelUsersComponent implements OnInit {
  readonly blockUserOptions: {[key: string]: string} = {
    'icon': 'pi pi-lock',
    'label': 'Block'
  };
  readonly unblockUserOptions: {[key: string]: string} = {
    'icon': 'pi pi-lock-open',
    'label': 'Unblock'
  };
  searchTerm: string | null = null;
  users: ServicePagedResultDto<AdminPanelUserDto[]>
    = new ServicePagedResultDto<AdminPanelUserDto[]>([], 0, 1, 1, 5);
  usersTableLoading: boolean = false;

  constructor(private readonly router: Router,
              private readonly userService: UserService,
              private readonly authService: AuthService,
              private readonly messageService: MessageService,
              private readonly confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  pageChangeHandler($event: PaginatorState) {
    this.usersTableLoading = true;
    this.userService.getUsersForAdminPage(
      ($event.page ?? 0) + 1,
      $event.rows ?? 5,
      this.searchTerm
    ).subscribe({
        next: result => {
          this.users = result;
          this.usersTableLoading = false;
        },
        error: this.errorHandler
      });
  }

  notMe(id: string): Observable<boolean> {
    return this.authService.loggedInUser.pipe(
      map(user => user?.id !== id));
  }

  onDeleteUserClick(id: string) {
    this.confirmationService.confirm({
      key: 'adminPage',
      message: `Are you sure you want to delete a user ${id}?`,
      header: 'Confirm deleting this user',
      icon: 'pi pi-trash',
      accept: () => this.deleteUser(id),
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-text'
    });
  }

  addNewUserClick() {
    this.router.navigateByUrl('/register');
  }

  refreshUsersList() {
    this.getUsers();
  }

  filterByName() {
    this.usersTableLoading = true;
    this.userService.getUsersForAdminPage(1, 5, this.searchTerm)
      .subscribe({
        next: result => {
          this.users = result;
          this.usersTableLoading = false;
        },
        error: this.errorHandler
      });
  }

  clearFilter() {
    this.searchTerm = null;
    this.getUsers();
  }

  onUserBlockStatusChangeClicked(user: AdminPanelUserDto) {
    this.confirmationService.confirm({
      key: 'adminPage',
      message: `Are you sure you want to ${user.isBlocked ? this.unblockUserOptions['label'].toLowerCase() : this.blockUserOptions['label'].toLowerCase()} this user?`,
      accept: () => this.changeUserBlockStatus(user.id),
      header: `Confirm ${user.isBlocked ? this.unblockUserOptions['label'].toLowerCase() : this.blockUserOptions['label'].toLowerCase()}ing this user`,
      icon: user.isBlocked ? this.unblockUserOptions['icon'] : this.blockUserOptions['icon'],
      acceptIcon: user.isBlocked ? this.unblockUserOptions['icon'] : this.blockUserOptions['icon'],
      acceptButtonStyleClass: 'p-button-danger',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-text'
    });
  }

  private errorHandler = () => {
    this.messageService.add({
      severity: 'error',
      summary: 'Failed to get users!'
    });
    this.users = new ServicePagedResultDto<AdminPanelUserDto[]>([], 0, 1, 1, 5);
    this.usersTableLoading = false;
  };

  private getUsers() {
    this.usersTableLoading = true;
    this.userService.getUsersForAdminPage(1, 5, this.searchTerm)
      .subscribe({
        next: result => {
          this.users = result;
          setTimeout(() => window.scrollTo(0, 0));
          this.usersTableLoading = false;
        },
        error: this.errorHandler
      });
  }

  private deleteUser(id: string) {
    this.userService.deleteUser(id)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: `Successfully deleted a user ${id}`
          });
          this.getUsers();
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Failed to delete a user!'
        }),
      });
  }

  private changeUserBlockStatus(id: string) {
    this.userService.changeBlockStatus(id)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: `Successfully blocked a user ${id}`
          });
          this.getUsers();
        }
      });
  }
}
