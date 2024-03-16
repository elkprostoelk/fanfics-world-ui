import { Component, OnInit } from '@angular/core';
import {FanficDto} from "../../dto/fanficDto";
import {FanficsService} from "../../services/fanfics/fanfics.service";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-fanfic-page',
  templateUrl: './fanfic-page.component.html',
  styleUrls: ['./fanfic-page.component.less']
})
export class FanficPageComponent implements OnInit {
  fanfic?: FanficDto;
  constructor(
    private readonly fanficService: FanficsService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
        map(paramMap => Number(paramMap.get('id'))),
        mergeMap(fanficId => this.fanficService.getFanfic(fanficId)))
      .subscribe({
        next: fanficDto => this.fanfic = fanficDto,
        error: (err: HttpErrorResponse) => this.messageService.add({
          severity: 'error',
          summary: err.message ?? err
        })
      });
  }

  getCoauthorsNames(): string {
    return this.fanfic?.coauthors.map(arr => arr.userName).join(', ') ?? '';
  }
}
