import { ApplicationError } from "./ApplicationError";

export class NewChangesFoundError extends ApplicationError {
  constructor() {
    super("new_changes_found", "New changes found");
  }
}
