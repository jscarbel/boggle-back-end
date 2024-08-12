export const ensureNumberOrThrow = (value: unknown): number => {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return parseInt(value);
  } else if (value === null || value === undefined) {
    return 0;
  }

  throw new Error(`Could not parse ${value} into a number`);
};

export const ensureErrorObject = (e: unknown): Error => {
  if (e instanceof Error) {
    return e;
  }

  return new Error(JSON.stringify(e));
};
