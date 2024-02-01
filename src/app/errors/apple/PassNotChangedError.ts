import { ApplicationError } from "../ApplicationError";

export class PassNotChangedError extends ApplicationError {
  constructor(
    message = "Pass has not been changed",
    code = "pass_has_not_been_changed"
  ) {
    super(code, message);
  }
}
