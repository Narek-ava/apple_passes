import { ValidationResult } from "joi";
import { Optional } from "../models/common";
import { ValidationError } from "../errors/ValidationError";

export function parseValidationResult(
  validationResult: ValidationResult
): Optional<ValidationError> {
  const errorDetails = validationResult.error?.details[0] ?? undefined;
  if (errorDetails === undefined) {
    return undefined;
  }

  return new ValidationError(
    errorDetails.type,
    errorDetails.message,
    errorDetails.context?.label
  );
}
