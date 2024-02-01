const defaultLimit = 25;
const unlimitedLimit = 1000000;

export class Pagination {
  constructor(
    private _limit: number = defaultLimit,
    private _offset: number = 0
  ) {}

  static createUnlimited(): Pagination {
    return new Pagination(unlimitedLimit);
  }

  static createSingleResult(): Pagination {
    return new Pagination(1);
  }

  get limit(): number {
    return Math.max(1, this._limit);
  }

  get offset(): number {
    return Math.max(0, this._offset);
  }
}
