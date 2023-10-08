import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TagDto} from "../../dto/tagDto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly tagPath: string = 'tag/';

  constructor(private readonly http: HttpClient) { }

  getTagsByTitle(tagSearchLine: string) {
    return this.http.get<TagDto[]>(`${environment.apiPath}${this.tagPath}search?title=${tagSearchLine}`);
  }
}
