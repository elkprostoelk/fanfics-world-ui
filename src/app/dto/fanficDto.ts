import {SimpleUserDto} from "./simpleUserDto";
import {SimpleFandomDto} from "./simpleFandomDto";
import {TagDto} from "./tagDto";

export class FanficDto {
  constructor(
    public id: number,
    public title: string,
    public text: string,
    public createdDate: Date,
    public lastModified: Date,
    public origin: string,
    public status: string,
    public rating: string,
    public direction: string,
    public views: number,
    public author: SimpleUserDto,
    public coauthors: SimpleUserDto[],
    public fandoms: SimpleFandomDto[],
    public tags: TagDto[],
    public annotation?: string | null
  ) { }
}
