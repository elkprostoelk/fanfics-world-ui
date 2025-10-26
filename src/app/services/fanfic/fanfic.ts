import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Fanfics {
  private readonly baseUrl = `${environment.apiUrl}api/fanfics`;

  constructor(private readonly http: HttpClient) {}

  addFanfic(addFanficData: any) {
    return this.http.post(this.baseUrl, addFanficData, {
      responseType: 'text'
    });
  }
}
