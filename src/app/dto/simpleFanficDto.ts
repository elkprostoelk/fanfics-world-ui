import { SimpleUserDto } from "./simpleUserDto";
import { SimpleFandomDto } from "./simpleFandomDto";
import {TagDto} from "./tagDto";

export interface SimpleFanficDto {
  id: number;

  title: string;

  annotation: string;

  createdDate: Date;

  lastModified: Date | undefined;

  origin: string;

  status: string;

  rating: string;

  direction: string;

  author: SimpleUserDto;

  coauthors: SimpleUserDto[];

  fandoms: SimpleFandomDto[];

  tags: TagDto[];
}
