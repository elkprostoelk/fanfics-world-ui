import { Component, OnInit } from '@angular/core';
import {FanficDto} from "../../dto/fanficDto";
import {FanficsService} from "../../services/fanfics/fanfics.service";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs";
import {AppToastService} from "../../services/app-toast/app-toast.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-fanfic-page',
  templateUrl: './fanfic-page.component.html',
  styleUrls: ['./fanfic-page.component.less']
})
export class FanficPageComponent implements OnInit {
  fanfic?: FanficDto;
  constructor(
    private readonly fanficService: FanficsService,
    private readonly toastService: AppToastService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
        map(paramMap => Number(paramMap.get('id'))),
        mergeMap(fanficId => this.fanficService.getFanfic(fanficId)))
      .subscribe({
        next: fanficDto => this.fanfic = fanficDto,
        error: (err: HttpErrorResponse) => this.toastService.show('Error!', err.error)
      });
  }

  getCoauthorsNames(): string {
    return this.fanfic?.coauthors.map(arr => arr.userName).join(', ') ?? '';
  }
}
