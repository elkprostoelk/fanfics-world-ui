import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { SimpleFanficDto } from "../../dto/simpleFanficDto";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";
import {SimpleFandomDto} from "../../dto/simpleFandomDto";

@Injectable({
  providedIn: 'root'
})
export class FanficsService {
  private readonly fanficsRoute: string = 'fanfic/';

  constructor(
    private readonly httpClient: HttpClient
  ) {

  }

  getFanficsPage(): Observable<ServicePagedResultDto<SimpleFanficDto>> {
    return this.httpClient.get<ServicePagedResultDto<SimpleFanficDto>>(environment.apiPath + this.fanficsRoute);
  }

  getFandomsNamesLine(fandoms: SimpleFandomDto[]): string {
    return fandoms.map(f => f.title).join(', ');
  }
}
