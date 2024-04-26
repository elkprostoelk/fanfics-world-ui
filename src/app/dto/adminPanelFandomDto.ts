export class AdminPanelFandomDto {
  constructor(public id: number,
              public title: string,
              public fanficsCount: number,
              public isDeleted: boolean) {}
}
