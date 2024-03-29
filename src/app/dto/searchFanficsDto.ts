export class SearchFanficsDto {
  constructor(
    public searchByTitle?: string,
    public fandomIds?: number[],
    public tagIds?: number[],
    public origins?: string,
    public directions?: string,
    public ratings?: string,
    public statuses?: string,
    public sortBy?: string,
    public sortOrder?: string
  ) {
  }
}
