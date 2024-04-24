import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimpleUserDto} from "../../dto/simpleUserDto";
import {environment} from "../../../environments/environment";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";
import {AdminPanelUserDto} from "../../dto/adminPanelUserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userRoute: string = 'user';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getUsers(userName: string): Observable<SimpleUserDto[]> {
    return this.httpClient.get<SimpleUserDto[]>(
      `${environment.apiPath}${this.userRoute}?userName=${userName}`);
  }

  getUsersForAdminPage(page: number, itemsPerPage: number, searchTerm: string | null = null): Observable<ServicePagedResultDto<AdminPanelUserDto[]>> {
    let url: string = `${environment.apiPath}${this.userRoute}/admin-page?page=${page}&itemsPerPage=${itemsPerPage}`;
    if (searchTerm !== null) {
      url = `${url}&searchTerm=${searchTerm}`;
    }
    return this.httpClient.get<ServicePagedResultDto<AdminPanelUserDto[]>>(url);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiPath}${this.userRoute}/${id}`);
  }

  changeBlockStatus(id: string): Observable<any> {
    return this.httpClient.patch(`${environment.apiPath}${this.userRoute}/block-status/${id}`, null);
  }
}
