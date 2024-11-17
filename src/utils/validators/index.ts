type Validator<T> = (input: string, context?: T) => string | null;

type ValidationResult = {
  errors: string[];
  isValid: boolean;
};

type CreateValidatorReturnType<T> = (
  input: string,
  context?: T
) => ValidationResult;

const createValidator = <T>(
  validators: Validator<T>[]
): CreateValidatorReturnType<T> => {
  return (input: string, context?: T): ValidationResult => {
    const errors = validators
      .map((validator) => validator(input, context))
      .filter((error) => error !== null) as string[];
    return {
      errors,
      isValid: errors.length === 0,
    };
  };
};

export { createValidator };
export type { Validator, ValidationResult };
