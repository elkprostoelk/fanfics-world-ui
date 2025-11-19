import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FanficsSearchCriteria} from '../../models/fanfics/fanficsSearchCriteria';
import {PagedResult} from '../../models/common/pagedResult';
import {FanficListItem} from '../../models/fanfics/fanficListItem';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FanficService {
  fanficsSearchCriteria$ = new BehaviorSubject<FanficsSearchCriteria>(new FanficsSearchCriteria());

  private readonly baseUrl = `${environment.apiUrl}api/fanfics`;

  constructor(private readonly http: HttpClient) {}

  addFanfic(addFanficData: any) {
    return this.http.post(this.baseUrl, addFanficData, {
      responseType: 'text'
    });
  }

  searchForFanfics(searchCriteria: FanficsSearchCriteria) {
    let httpParams = new HttpParams();
    Object.entries(searchCriteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });
    return this.http.get<PagedResult<FanficListItem>>(this.baseUrl, {params: httpParams});
  }
}
