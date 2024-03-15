export class UserDto {
  constructor(
    public id: number,
    public userName: string,
    public role: string,
    public expires: Date
) {}
}
