import { ApplicationError } from "./ApplicationError";
import { Optional } from "../models/common";

export class ValidationError extends ApplicationError {
  constructor(
    readonly code: string,
    readonly message: string,
    readonly field: Optional<string> = undefined
  ) {
    super(code, message);
  }
}
