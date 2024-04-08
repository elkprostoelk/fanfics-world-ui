import {SimpleUserDto} from "./simpleUserDto";

export class FanficCommentDto {
  constructor(
    public id: number,
    public text: string,
    public createdDate: Date,
    public likesCount: number,
    public dislikesCount: number,
    public currentUserReaction: boolean | null,
    public author: SimpleUserDto
  ) {
  }
}
