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
import {SimpleFandomDto} from "../../dto/simpleFandomDto";
import {FandomService} from "../../services/fandom/fandom.service";
import {TagDto} from "../../dto/tagDto";
import {TagService} from "../../services/tag/tag.service";

@Component({
  selector: 'app-add-fanfic',
  templateUrl: './add-fanfic.component.html',
  styleUrls: ['./add-fanfic.component.css'],
})
export class AddFanficComponent {
  addFanficForm: FormGroup;
  coauthors: SimpleUserDto[] = [];
  fandoms: SimpleFandomDto[] = [];
  tags: TagDto[] = [];

  public user: SimpleUserDto | undefined;
  public fandom: SimpleFandomDto | undefined;
  public tag: TagDto | undefined;

  constructor(
    private readonly builder: FormBuilder,
    private readonly service: FanficsService,
    private readonly toastService: AppToastService,
    private readonly userService: UserService,
    private readonly fandomService: FandomService,
    private readonly tagService: TagService
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

  userFormatter = (user: SimpleUserDto) => user.userName;

  fandomFormatter = (fandom: SimpleFandomDto) => fandom.title;

  tagFormatter = (tag: TagDto) => tag.name;

  searchCoauthors: OperatorFunction<string, SimpleUserDto[]> = (text$: Observable<string>) =>
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

  searchFandoms: OperatorFunction<string, SimpleFandomDto[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      mergeMap(fandomSearchLine => {
        if (fandomSearchLine) {
          return this.fandomService.getFandomsByTitle(fandomSearchLine);
        }
        return new Observable<SimpleFandomDto[]>();
      }));

  searchTags: OperatorFunction<string, TagDto[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      mergeMap(tagSearchLine => {
        if (tagSearchLine) {
          return this.tagService.getTagsByTitle(tagSearchLine);
        }
        return new Observable<TagDto[]>();
      }));

  userSelect(user: SimpleUserDto | undefined) {
    if (user && !this.coauthors.some(u =>
        u.id === user.id)) {
      this.coauthors.push(user);
      this.addFanficForm.get('coauthorIds')?.setValue(
        this.coauthors.map(u => u.id));
    }
  }

  fandomSelect(fandom: SimpleFandomDto | undefined) {
    if (fandom && !this.fandoms.some(f =>
        f.id === fandom.id)) {
      this.fandoms.push(fandom);
      this.addFanficForm.get('fandomIds')?.setValue(
        this.fandoms.map(f => f.id));
    }
  }

  tagSelect(tag: TagDto | undefined) {
    if (tag && !this.tags.some(t =>
        t.id === t.id)) {
      this.tags.push(tag);
      this.addFanficForm.get('tagIds')?.setValue(
        this.tags.map(t => t.id));
    }
  }

  deleteCoauthor(id: string) {
    this.coauthors = this.coauthors.filter(u => u.id !== id);
    this.addFanficForm.get('coauthorIds')?.setValue(
      this.coauthors.map(u => u.id));
  }

  deleteFandom(id: number) {
    this.fandoms = this.fandoms.filter(f => f.id !== id);
    this.addFanficForm.get('fandomIds')?.setValue(
      this.fandoms.map(f => f.id));
  }

  deleteTag(id: number) {
    this.tags = this.tags.filter(t => t.id !== id);
    this.addFanficForm.get('tagIds')?.setValue(
      this.tags.map(t => t.id));
  }
}
