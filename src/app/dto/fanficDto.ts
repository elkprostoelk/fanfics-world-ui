import {SimpleUserDto} from "./simpleUserDto";
import {SimpleFandomDto} from "./simpleFandomDto";
import {TagDto} from "./tagDto";

export interface FanficDto {
  id: number;
  title: string;
  annotation?: string | null;
  text: string;
  createdDate: Date;
  lastModified: Date;
  origin: string;
  status: string;
  rating: string;
  direction: string;
  views: number;
  author: SimpleUserDto
  coauthors: SimpleUserDto[],
  fandoms: SimpleFandomDto[],
  tags: TagDto[]
}
