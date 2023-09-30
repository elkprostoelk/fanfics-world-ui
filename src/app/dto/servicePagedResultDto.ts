export interface ServicePagedResultDto<T> {
  pageContent: T;
  totalItems: number;
  currentPage: number;
  pagesCount: number;
  itemsPerPage: number;
}
