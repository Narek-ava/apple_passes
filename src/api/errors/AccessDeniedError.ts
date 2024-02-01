import { ApplicationError } from "../../app/errors/ApplicationError";

export class AccessDeniedError extends ApplicationError {
  constructor() {
    super("access_denied", "Access denied");
  }
}
