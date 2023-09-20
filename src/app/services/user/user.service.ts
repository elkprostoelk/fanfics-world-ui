import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimpleUserDto} from "../../dto/simpleUserDto";
import {environment} from "../../../environments/environment";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userRoute: string = 'user/';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getUsers(pageNumber: number, size: number): Observable<ServicePagedResultDto<SimpleUserDto>> {
    return this.httpClient.get<ServicePagedResultDto<SimpleUserDto>>(`${environment.apiPath}${this.userRoute}get-chunk/${pageNumber}/${size}`);
  }
}
