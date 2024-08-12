const ensureNumberOrThrow = (value) => {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return parseInt(value);
  } else if (value === null || value === undefined) {
    return 0;
  }

  throw new Error(`Could not parse ${value} into a number`);
};

const ensureErrorObject = (e) => {
  if (e instanceof Error) {
    return e;
  }

  return new Error(JSON.stringify(e));
};

module.exports = { ensureNumberOrThrow, ensureErrorObject };
