export class ServiceResultDto {
  constructor(
    public isSuccess: boolean,
    public errorMessage: string
  ) {}
}
