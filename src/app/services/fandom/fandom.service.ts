import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimpleFandomDto} from "../../dto/simpleFandomDto";
import {environment} from "../../../environments/environment";

@Injectable()
export class FandomService {
  private readonly fandomPath: string = 'fandom/';

  constructor(private readonly http: HttpClient) { }

  getFandomsByTitle(title: string): Observable<SimpleFandomDto[]> {
    return this.http.get<SimpleFandomDto[]>(
      `${environment.apiPath}${this.fandomPath}search?title=${title}`);
  }
}
