export const MAX_TEXT_LENGTH = 512;
export const PHONE_LENGTH = 10;
export const MAX_ORDER_QUANTITY = 10;
export const MAX_REQUESTS_PER_WINDOW = 10;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const trimToUndefined = (value: unknown) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

export const requireBoundedText = (
  value: unknown,
  fieldName: string,
  options?: { maxLength?: number }
) => {
  const trimmed = trimToUndefined(value);
  const maxLength = options?.maxLength ?? MAX_TEXT_LENGTH;

  if (!trimmed) {
    throw new Error(`${fieldName} is required`);
  }

  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} must be ${maxLength} characters or less`);
  }

  return trimmed;
};

export const optionalBoundedText = (
  value: unknown,
  fieldName: string,
  options?: { maxLength?: number }
) => {
  const trimmed = trimToUndefined(value);
  const maxLength = options?.maxLength ?? MAX_TEXT_LENGTH;

  if (!trimmed) return undefined;

  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} must be ${maxLength} characters or less`);
  }

  return trimmed;
};

export const requirePhoneNumber = (value: unknown) => {
  const trimmed = requireBoundedText(value, "Phone", {
    maxLength: PHONE_LENGTH,
  });
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length !== PHONE_LENGTH) {
    throw new Error(`Phone must be exactly ${PHONE_LENGTH} digits`);
  }

  return digits;
};

export const optionalEmail = (value: unknown) => {
  const trimmed = optionalBoundedText(value, "Email");

  if (!trimmed) return undefined;

  if (!emailPattern.test(trimmed)) {
    throw new Error("Email must be valid");
  }

  return trimmed;
};

export const requirePositiveInteger = (
  value: unknown,
  fieldName: string,
  options?: { min?: number; max?: number }
) => {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new Error(`${fieldName} must be a valid integer`);
  }

  const min = options?.min ?? 1;
  const max = options?.max;

  if (value < min) {
    throw new Error(`${fieldName} must be at least ${min}`);
  }

  if (typeof max === "number" && value > max) {
    throw new Error(`${fieldName} must be ${max} or less`);
  }

  return value;
};

export const requirePositiveAmount = (
  value: unknown,
  fieldName: string,
  options?: { max?: number }
) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${fieldName} must be a valid number`);
  }

  if (value <= 0) {
    throw new Error(`${fieldName} must be greater than 0`);
  }

  if (typeof options?.max === "number" && value > options.max) {
    throw new Error(`${fieldName} must be ${options.max} or less`);
  }

  return value;
};

export const requireEnum = <T extends string>(
  value: unknown,
  allowed: readonly T[],
  fieldName: string
) => {
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw new Error(`${fieldName} is invalid`);
  }

  return value as T;
};
