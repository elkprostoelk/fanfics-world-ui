import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { SimpleFanficDto } from "../../dto/simpleFanficDto";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";
import {SimpleFandomDto} from "../../dto/simpleFandomDto";
import {FanficDto} from "../../dto/fanficDto";

@Injectable({
  providedIn: 'root'
})
export class FanficsService {
  private readonly fanficsRoute: string = `${environment.apiPath}fanfic`;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getFanfic(id: number): Observable<FanficDto> {
    return this.httpClient.get<FanficDto>(`${this.fanficsRoute}/${id}`);
  }

  getFanficsPage(page: number, itemsPerPage: number): Observable<ServicePagedResultDto<SimpleFanficDto[]>> {
    return this.httpClient.get<ServicePagedResultDto<SimpleFanficDto[]>>(`${this.fanficsRoute}`, {
      params: {
        'page': page + 1,
        'itemsPerPage': itemsPerPage
      }
    });
  }

  createFanfic(value: any): Observable<any> {
    return this.httpClient.post(`${environment.apiPath}${this.fanficsRoute}`,
      {
        title: value.title,
        annotation: value.annotation,
        text: value.text,
        origin: Number(value.origin),
        rating: Number(value.rating),
        direction: Number(value.direction),
        coauthorIds: value.coauthorIds,
        fandomIds: value.fandomIds,
        tagIds: value.tagIds
      });
  }
}
