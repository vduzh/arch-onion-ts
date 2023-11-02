export enum ErrorName {
  NOT_FOUND = 'NOT_FOUND',
}

export class ErrorDto {
  //name: ErrorName;
  //message?: string;
  constructor(
    public name: ErrorName,
    public message: string,
  ) {}
}
