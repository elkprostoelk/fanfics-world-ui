export class LoggedInUserDto {
  constructor(
    public id: string,
    public userName: string,
    public role: string,
    public expires: Date,
    public dateOfBirth: Date
) {}
}
