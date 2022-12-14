import { Component } from '@angular/core';
import {FanficsService} from "../../services/fanfics/fanfics.service";
import {BehaviorSubject} from "rxjs";
import {SimpleFanficDto} from "../../dto/simpleFanficDto";
import {HttpErrorResponse} from "@angular/common/http";
import {AppToastService} from "../../services/app-toast/app-toast.service";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";

@Component({
  selector: 'app-fanfics',
  templateUrl: './fanfics.component.html',
  styleUrls: ['./fanfics.component.css']
})
export class FanficsComponent {
  fanfics$: BehaviorSubject<ServicePagedResultDto<SimpleFanficDto> | undefined>
    = new BehaviorSubject<ServicePagedResultDto<SimpleFanficDto> | undefined>(undefined);

  constructor(
    readonly fanficsService: FanficsService,
    private readonly toastService: AppToastService
  ) {
    this.fanficsService.getFanficsPage()
      .subscribe({
        next: (fanfics) => {
          this.fanfics$.next(fanfics);
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.show('Error!', err.error);
        }
      });
  }

}
