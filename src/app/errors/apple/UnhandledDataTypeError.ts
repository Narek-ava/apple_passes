import { ApplicationError } from "../ApplicationError";

export class UnhandledDataTypeError extends ApplicationError {
  constructor(message = "Unhandled data type", code = "unhandled_data_type") {
    super(code, message);
  }
}
