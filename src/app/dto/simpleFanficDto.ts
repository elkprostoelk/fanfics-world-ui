import { SimpleUserDto } from "./simpleUserDto";
import { SimpleFandomDto } from "./simpleFandomDto";
import {TagDto} from "./tagDto";

export class SimpleFanficDto {
  constructor(
    public id: number,
    public title: string,
    public annotation: string,
    public createdDate: Date,
    public origin: string,
    public status: string,
    public rating: string,
    public direction: string,
    public author: SimpleUserDto,
    public coauthors: SimpleUserDto[],
    public fandoms: SimpleFandomDto[],
    public tags: TagDto[],
    public lastModified: Date | null
  ) {}
}
