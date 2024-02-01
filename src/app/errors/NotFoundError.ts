import { ApplicationError } from "./ApplicationError";

export class NotFoundError extends ApplicationError {
  constructor(code = "not_found", message = "Not found") {
    super(code, message);
  }
}
