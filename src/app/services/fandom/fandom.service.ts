import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimpleFandomDto} from "../../dto/simpleFandomDto";
import {environment} from "../../../environments/environment";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";
import {AdminPanelFandomDto} from "../../dto/adminPanelFandomDto";

@Injectable({
  providedIn: 'root'
})
export class FandomService {
  private readonly fandomPath: string = `${environment.apiPath}fandom`;

  constructor(private readonly http: HttpClient) { }

  getFandomsByTitle(title: string): Observable<SimpleFandomDto[]> {
    return this.http.get<SimpleFandomDto[]>(
      `${this.fandomPath}/search?title=${title}`);
  }

  getFandomsForAdminPage(page: number = 1,
                         itemsPerPage: number = 5,
                         searchTerm: string | null = null): Observable<ServicePagedResultDto<AdminPanelFandomDto[]>> {
    let uri: string = `${this.fandomPath}?page=${page}&itemsPerPage=${itemsPerPage}`;
    if (searchTerm) {
      uri = `${uri}&searchByName=${searchTerm}`;
    }
    return this.http.get<ServicePagedResultDto<AdminPanelFandomDto[]>>(uri);
  }

  addNewFandom(value: { title: string }): Observable<any> {
    return this.http.post(this.fandomPath, value);
  }

  deleteFandom(id: number): Observable<any> {
    return this.http.delete<any>(`${this.fandomPath}/${id}`);
  }
}
