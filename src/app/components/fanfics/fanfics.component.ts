import {Component, OnInit} from '@angular/core';
import {FanficsService} from "../../services/fanfics/fanfics.service";
import {BehaviorSubject} from "rxjs";
import {SimpleFanficDto} from "../../dto/simpleFanficDto";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";
import {PaginatorState} from "primeng/paginator";
import {MessageService} from "primeng/api";
import {SearchFanficsDto} from "../../dto/searchFanficsDto";

@Component({
  selector: 'app-fanfics',
  templateUrl: './fanfics.component.html',
  styleUrls: ['./fanfics.component.less']
})
export class FanficsComponent implements OnInit {
  searchParams: SearchFanficsDto = new SearchFanficsDto();
  fanfics$: BehaviorSubject<ServicePagedResultDto<SimpleFanficDto[]> | undefined>
    = new BehaviorSubject<ServicePagedResultDto<SimpleFanficDto[]> | undefined>(undefined);
  isLoading: boolean = false;

  constructor(
    private readonly fanficsService: FanficsService,
    private readonly messageService: MessageService
  ) {  }

  ngOnInit() {
    this.isLoading = true;
    this.fanficsService.getFanficsPage(this.searchParams, 0, 20)
      .subscribe({
        next: fanfics => this.fanfics$.next(fanfics),
        error: this.errorHandler,
        complete: this.completeHandler
      });
  }

  pageChangeHandler($event: PaginatorState) {
    this.isLoading = true;
    this.fanficsService.getFanficsPage(this.searchParams, $event.page ?? 0, $event.rows ?? 20)
        .subscribe({
          next: fanfics => {
            this.fanfics$.next(fanfics);
            setTimeout(() => window.scrollTo(0, 0));
          },
          error: this.errorHandler,
          complete: this.completeHandler
        });
  }

  onSearchFanfics($event: SearchFanficsDto) {
    this.isLoading = true;
    this.searchParams = $event;
    this.fanficsService.getFanficsPage(this.searchParams, 0, 20)
        .subscribe({
          next: fanfics => {
            this.fanfics$.next(fanfics);
            setTimeout(() => window.scrollTo(0, 0));
          },
          error: this.errorHandler,
          complete: this.completeHandler
        });
  }

  private errorHandler() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error on getting fanfics!'
    });
    this.fanfics$.next(undefined);
  }

  private completeHandler = () => this.isLoading = false;
}
