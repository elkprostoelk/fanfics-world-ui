export class UserDto {
  constructor(
    public id: string,
    public userName: string,
    public role: string,
    public expires: Date
) {}
}
