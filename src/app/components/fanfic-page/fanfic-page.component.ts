import { Component, OnInit } from '@angular/core';
import {FanficDto} from "../../dto/fanficDto";
import {FanficsService} from "../../services/fanfics/fanfics.service";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap, Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-fanfic-page',
  templateUrl: './fanfic-page.component.html',
  styleUrls: ['./fanfic-page.component.less']
})
export class FanficPageComponent implements OnInit {
  fanfic?: FanficDto;
  readonly fanficStatusTagIcon: {[key: string]: string} = {
    'In progress': 'caret-right',
    'Finished': 'check',
    'Frozen': 'pause'
  };
  readonly fanficStatusTagColor: {[key: string]: string} = {
    'In progress': '',
    'Finished': 'green',
    'Frozen': 'cyan'
  };
  readonly fanficOriginTagIcon: {[key: string]: string} = {
    'Original Text': 'align-justify',
    'Translation': 'globe'
  };
  readonly fanficRatingTagColor: {[key: string]: string} = {
    'G': 'green',
    'PG-13': 'lightgreen',
    'R': 'gold',
    'NC-17': 'darkorange',
    'NC-21': 'darkred'
  };
  readonly fanficDirectionTagColor: {[key: string]: string} = {
    'Gen': 'brown',
    'Het': 'green',
    'Slash': 'darkturquoise',
    'Femslash': 'purple',
    'Other': 'darkgreen',
    'Mixed': 'gold',
    'Article': 'gray'
  };

  constructor(
    private readonly fanficService: FanficsService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
        map(paramMap => Number(paramMap.get('id'))),
        mergeMap(fanficId => this.fanficService.getFanfic(fanficId)))
      .subscribe({
        next: fanficDto => this.fanfic = fanficDto,
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Error on getting fanfic!'
        })
      });
  }

  get isAuthor(): Observable<boolean> {
    return this.authService.loggedInUser
      .pipe(map(user => user?.id === this.fanfic?.author.id));
  }
}
