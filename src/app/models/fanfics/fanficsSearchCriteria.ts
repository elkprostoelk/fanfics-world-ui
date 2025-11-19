import {SortingOrder} from '../common/sortingOrder';
import {FanficsSortingFieldsConstants} from './fanficsSortingFieldsConstants';

export class FanficsSearchCriteria {
  directions: string | null;
  ratings: string | null;
  statuses: string | null;
  author: string | null;
  sortBy: string;
  sortingOrder: SortingOrder;
  currentPage: number;
  pageSize: number;

  constructor(
    directions: string | null = null,
    ratings: string | null = null,
    statuses: string | null = null,
    author: string | null = null,
    sortBy: string = FanficsSortingFieldsConstants.CreatedDate,
    sortingOrder: SortingOrder = SortingOrder.Descending,
    currentPage: number = 1,
    pageSize: number = 10) {
    this.directions = directions;
    this.ratings = ratings;
    this.statuses = statuses;
    this.author = author;
    this.sortBy = sortBy;
    this.sortingOrder = sortingOrder;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
