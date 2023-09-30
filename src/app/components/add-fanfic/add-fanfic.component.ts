import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  map, mergeMap,
  Observable,
  OperatorFunction
} from "rxjs";
import { FanficsService } from "../../services/fanfics/fanfics.service";
import { AppToastService } from "../../services/app-toast/app-toast.service";
import { SimpleUserDto } from "../../dto/simpleUserDto";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: 'app-add-fanfic',
  templateUrl: './add-fanfic.component.html',
  styleUrls: ['./add-fanfic.component.css'],
})
export class AddFanficComponent {
  addFanficForm: FormGroup;
  coauthors: SimpleUserDto[] = [];

  public user: SimpleUserDto | undefined;

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
        coauthorIds: [[]],
        fandomIds: [[], [Validators.required]],
        tagIds: [[]],
      });
  }

  formatter = (user: SimpleUserDto) => user.userName;

  search: OperatorFunction<string, SimpleUserDto[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      mergeMap(userNameSearchLine => {
        if (userNameSearchLine) {
          return this.userService.getUsersV2(userNameSearchLine, 0, 10)
            .pipe(map(res =>
              res.pageContent)
            );
        }
        return new Observable<SimpleUserDto[]>();
      }));

  userSelect(user: SimpleUserDto | undefined) {
    if (user && !this.coauthors.some(u =>
        u.id === user.id)) {
      this.coauthors.push(user);
      this.addFanficForm.get('coauthorIds')?.setValue(this.coauthors.map(u => u.id));
    }
  }

  deleteCoauthor(id: string) {
    this.coauthors = this.coauthors.filter(u => u.id !== id);
  }
}
