export class ServicePagedResultDto<T> {
  constructor(
    public pageContent: T,
    public totalItems: number,
    public currentPage: number,
    public pagesCount: number,
    public itemsPerPage: number
  ) {}
}
