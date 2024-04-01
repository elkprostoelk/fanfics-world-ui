import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SimpleFanficDto } from "../../dto/simpleFanficDto";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";
import {FanficDto} from "../../dto/fanficDto";
import {environment} from "../../../environments/environment";
import {SearchFanficsDto} from "../../dto/searchFanficsDto";

@Injectable({
  providedIn: 'root'
})
export class FanficsService {
  private readonly fanficsRoute: string = `${environment.apiPath}fanfic`;
  private readonly fanficsv2Route: string = `${environment.apiPath}v2/fanfic`;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getFanfic(id: number): Observable<FanficDto> {
    return this.httpClient.get<FanficDto>(`${this.fanficsRoute}/${id}`);
  }

  getFanficsPage(searchParams: SearchFanficsDto, page: number, itemsPerPage: number): Observable<ServicePagedResultDto<SimpleFanficDto[]>> {
    return this.httpClient.get<ServicePagedResultDto<SimpleFanficDto[]>>(`${this.fanficsv2Route}${this.buildQuery(searchParams, page + 1, itemsPerPage)}`);
  }

  createFanfic(value: any): Observable<any> {
    return this.httpClient.post(`${this.fanficsRoute}`,
      {
        title: value.title,
        annotation: value.annotation,
        text: value.text,
        origin: Number(value.origin),
        rating: Number(value.rating),
        direction: Number(value.direction),
        coauthorIds: value.coauthorIds.map((a: { id: string; }) => a.id),
        fandomIds: value.fandomIds.map((f: { id: number; }) => f.id),
        tagIds: value.tagIds.map((t: { id: number; }) => t.id)
      });
  }

  private buildQuery(searchParams: SearchFanficsDto, page: number, itemsPerPage: number): string {
    let result = '?';
    if (searchParams) {
      if (searchParams.searchByTitle) {
        result = result.concat(`&searchByTitle=${searchParams.searchByTitle}`);
      }
      if (searchParams.fandomIds && searchParams.fandomIds.length > 0) {
        result = result.concat('&fandomIds=', searchParams.fandomIds.join(',&fandomIds='));
      }
      if (searchParams.tagIds && searchParams.tagIds.length > 0) {
        result = result.concat('&tagIds=', searchParams.tagIds.join(',&fandomIds='));
      }
      if (searchParams.directions) {
        result = result.concat('&directions=', searchParams.directions);
      }
      if (searchParams.origins) {
        result = result.concat('&origins=', searchParams.origins);
      }
      if (searchParams.statuses) {
        result = result.concat('&statuses=', searchParams.statuses);
      }
      if (searchParams.ratings) {
        result = result.concat('&ratings=', searchParams.ratings);
      }
      if (searchParams.sortBy) {
        result = result.concat('&sortBy=', searchParams.sortBy);
      }
      if (searchParams.sortOrder) {
        result = result.concat('&sortOrder=', searchParams.sortOrder);
      }
    }

    return result.concat(`&page=${page}&itemsPerPage=${itemsPerPage}`);
  }

  editFanfic(id: number, value: any): Observable<any> {
    return this.httpClient.put(`${this.fanficsRoute}`, {
      id: id,
      title: value.title,
      annotation: value.annotation,
      text: value.text,
      origin: Number(value.origin),
      rating: Number(value.rating),
      direction: Number(value.direction),
      coauthorIds: value.coauthorIds.map((a: { id: string; }) => a.id),
      fandomIds: value.fandomIds.map((f: { id: number; }) => f.id),
      tagIds: value.tagIds.map((t: { id: number; }) => t.id)
    });
  }

  getFanficInternal(id: number): Observable<FanficDto> {
    return this.httpClient.get<FanficDto>(`${environment.apiPath}internal/fanfic/${id}`);
  }

  deleteFanfic(id: number): Observable<any> {
    return this.httpClient.delete(`${this.fanficsRoute}/${id}`);
  }
}
