import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TagDto} from "../../dto/tagDto";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AdminPanelTagDto} from "../../dto/adminPanelTagDto";
import {ServicePagedResultDto} from "../../dto/servicePagedResultDto";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly tagPath: string = `${environment.apiPath}tag`;

  constructor(private readonly http: HttpClient) { }

  getTagsByTitle(tagSearchLine: string) {
    return this.http.get<TagDto[]>(`${this.tagPath}/search?title=${tagSearchLine}`);
  }

  getTagsForAdminPage(searchTerm: string | null = null, page: number = 1, itemsPerPage = 5): Observable<ServicePagedResultDto<AdminPanelTagDto[]>> {
    let uri: string = `${this.tagPath}?page=${page}&itemsPerPage=${itemsPerPage}`;
    if (searchTerm) {
      uri = `${uri}&searchByName=${searchTerm}`;
    }

    return this.http.get<ServicePagedResultDto<AdminPanelTagDto[]>>(uri);
  }
}
