import { ApplicationError } from "../../app/errors/ApplicationError";

export class UnauthorizedError extends ApplicationError {
  constructor() {
    super("unauthorized", "Unauthorized");
  }
}
