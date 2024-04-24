export class AdminPanelUserDto {
  constructor(public id: string,
              public userName: string,
              public email: string,
              public registrationDate: Date,
              public dateOfBirth: Date,
              public fanficsCount: number,
              public coauthoredFanficsCount: number,
              public isBlocked: boolean) {}
}
