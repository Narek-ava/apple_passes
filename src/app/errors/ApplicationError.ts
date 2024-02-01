type Meta = { [key: string]: unknown };

export class ApplicationError extends Error {
  public meta: Meta = {};

  constructor(readonly code: string, readonly message: string) {
    super(message);
  }

  setMeta(meta: Meta): ApplicationError {
    this.meta = meta;

    return this;
  }
}
