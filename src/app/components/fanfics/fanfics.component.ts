import {Component, OnInit} from '@angular/core';
import {FanficsService} from "../../services/fanfics/fanfics.service";
import {BehaviorSubject} from "rxjs";
import {SimpleFanficDto} from "../../dto/simpleFanficDto";
import {HttpErrorResponse} from "@angular/common/http";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";
import {PaginatorState} from "primeng/paginator";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-fanfics',
  templateUrl: './fanfics.component.html',
  styleUrls: ['./fanfics.component.less']
})
export class FanficsComponent implements OnInit {
  fanfics$: BehaviorSubject<ServicePagedResultDto<SimpleFanficDto[]> | undefined>
    = new BehaviorSubject<ServicePagedResultDto<SimpleFanficDto[]> | undefined>(undefined);

  constructor(
    private readonly fanficsService: FanficsService,
    private readonly messageService: MessageService
  ) {  }

  ngOnInit() {
    this.fanficsService.getFanficsPage(0, 20)
      .subscribe({
        next: fanfics => this.fanfics$.next(fanfics),
        error: (err: HttpErrorResponse) => this.messageService.add({
          severity: 'error',
          summary: err.error ?? err
        })
      });
  }

  pageChangeHandler($event: PaginatorState) {
    this.fanficsService.getFanficsPage($event.page ?? 0, $event.rows ?? 20)
      .subscribe({
        next: fanfics => {
          this.fanfics$.next(fanfics);
          $event.pageCount = fanfics.pagesCount;
          setTimeout(() => window.scrollTo(0, 0));
        },
        error: (err: HttpErrorResponse) => this.messageService.add({
          severity: 'error',
          summary: err.error ?? err
        })
      });
  }
}
