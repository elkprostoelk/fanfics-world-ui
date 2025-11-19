import {FanficDirection} from './fanficDirection';
import {FanficRating} from './fanficRating';
import {FanficStatus} from './fanficStatus';

export interface FanficListItem {
  id: string,
  title: string,
  description: string,
  direction: FanficDirection,
  status: FanficStatus,
  rating: FanficRating,
  createdDate: Date,
  lastModifiedDate: Date,
  author: FanficListItemAuthor
}

export interface FanficListItemAuthor {
  id: string,
  name: string
}
