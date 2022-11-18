import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { FanficsService } from "../../services/fanfics/fanfics.service";
import { HttpErrorResponse } from "@angular/common/http";
import { AppToastService } from "../../services/app-toast/app-toast.service";
import { SimpleUserDto } from "../../dto/simpleUserDto";
import { UserService } from "../../services/user/user.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-add-fanfic',
  templateUrl: './add-fanfic.component.html',
  styleUrls: ['./add-fanfic.component.css']
})
export class AddFanficComponent {
  users$: BehaviorSubject<SimpleUserDto[] | undefined>
    = new BehaviorSubject<SimpleUserDto[] | undefined>(undefined);
  addFanficForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly service: FanficsService,
    private readonly toastService: AppToastService,
    private readonly userService: UserService
    ) {
      this.addFanficForm = builder.group({
        title: ['', [Validators.required]],
        annotation: [''],
        text: ['', [Validators.required]],
        origin: ['', [Validators.required]],
        rating: ['', [Validators.required]],
        direction: ['', [Validators.required]],
        coauthorIds: [''],
        fandomIds: ['', [Validators.required]],
        tagIds: [''],
      });
      this.getUsersPage(0);
  }

  getUsersPage(pageNumber: number) {
    this.userService.getUsers(pageNumber, environment.chunkSize)
      .subscribe({
        next: value => this.users$.next(value),
        error: (err: HttpErrorResponse) =>
          this.toastService.show('Error!', err.error)
      });
  }

}
