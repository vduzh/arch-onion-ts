/**
 * TBD
 */
export class DataSource<T> {
  constructor(
    public readonly name: string = '',
    public readonly data: T[] = [],
  ) {}
}
