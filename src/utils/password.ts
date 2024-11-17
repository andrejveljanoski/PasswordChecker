import { Validator, createValidator } from "./validators";

type PasswordValidatorContext = { username?: string } | undefined;

const minLengthValidator: Validator<PasswordValidatorContext> = (input) =>
  input.length >= 8 ? null : "Password must be at least 8 characters long";
const uppercaseValidator: Validator<PasswordValidatorContext> = (input) =>
  /[A-Z]/.test(input)
    ? null
    : "Password must contain at least one uppercase letter";
const lowercaseValidator: Validator<PasswordValidatorContext> = (input) =>
  /[a-z]/.test(input)
    ? null
    : "Password must contain at least one lowercase letter";
const numberValidator: Validator<PasswordValidatorContext> = (input) =>
  /[0-9]/.test(input) ? null : "Password must contain at least one number";
const specialCharValidator: Validator<PasswordValidatorContext> = (input) =>
  /[^A-Za-z0-9]/.test(input)
    ? null
    : "Password must contain at least one special character";

const commonPasswords = ["password", "12345", "qwerty", "admin"];
const commonWordsValidator: Validator<PasswordValidatorContext> = (input) =>
  commonPasswords.some((common) => input.toLowerCase().includes(common))
    ? "Password should not contain common words or patterns"
    : null;

const uniquenessValidator: Validator<PasswordValidatorContext> = (
  input,
  context
) =>
  input.toLowerCase() === context?.username?.toLowerCase()
    ? "Password should not be identical to the username"
    : null;

const passwordValidator = createValidator([
  minLengthValidator,
  uppercaseValidator,
  lowercaseValidator,
  numberValidator,
  specialCharValidator,
  commonWordsValidator,
  uniquenessValidator,
]);

const calculatePasswordStrength = (
  password: string,
  username?: string
): number => {
  if (!passwordValidator(password, { username }).isValid) {
    if (password.length > 0) {
      return 10;
    }
    return 0;
  }

  let score = 30;

  const lengthAboveMin = password.length - 8;
  score += Math.min(lengthAboveMin, 5) * 2;

  const numberOfUpperCaseCharsAboveMin =
    (password.match(/[A-Z]/g) || []).length - 1;
  score += Math.min(numberOfUpperCaseCharsAboveMin, 5) * 4;

  const numberOfNumbersAboveMin = (password.match(/[0-9]/g) || []).length - 1;
  score += Math.ceil(Math.min(numberOfNumbersAboveMin, 3) * 6.66);

  const numberOfSpecialCharsAboveMin =
    (password.match(/[^A-Za-z0-9]/g) || []).length - 1;
  score += Math.ceil(Math.min(numberOfSpecialCharsAboveMin, 3) * 6.66);

  return score;
};

export { passwordValidator, calculatePasswordStrength };
