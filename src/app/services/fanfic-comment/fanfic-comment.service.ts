import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {FanficCommentDto} from "../../dto/fanficCommentDto";

@Injectable({
  providedIn: 'root'
})
export class FanficCommentService {

  readonly fanficCommentPath: string = 'fanficcomment';
  constructor(private readonly http: HttpClient) { }

  getFanficComments(fanficId: number): Observable<FanficCommentDto[]> {
    return this.http.get<FanficCommentDto[]>(`${environment.apiPath}${this.fanficCommentPath}/all/${fanficId}`);
  }

  sendFanficComment(value: any): Observable<any> {
    return this.http.post<any>(`${environment.apiPath}${this.fanficCommentPath}`, value);
  }

  setReaction(commentId: number, isLike: boolean | null = null): Observable<any> {
    let uri = `${environment.apiPath}${this.fanficCommentPath}/${commentId}`;
    if (isLike !== null) {
      uri = uri.concat(`?userLiked=${isLike}`);
    }

    return this.http.post<any>(uri, null);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiPath}${this.fanficCommentPath}/${id}`);
  }
}
