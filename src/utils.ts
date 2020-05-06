import { ValidType } from "./types";

export const intersect = (obj: any, obj2: any) => {
  for (const key in obj) {
    if (obj2[key] !== undefined) return true;
  }
  return false;
};

/**
 * Overwrite object obj1 over obj2
 */
export const mergeObject = (obj1: any, obj2: any) => {
  const ret: any = { ...obj1 };
  for (const profile in obj2) {
    const next = obj2[profile];
    const original = obj1[profile] || {};
    ret[profile] = { ...original, ...next };
  }
  return ret;
};

export const validateType = (value: any, type: ValidType): (string | number | boolean | string[]) => {
  switch (type) {
    case "string":
      if (typeof value !== "string") throw new TypeError(`Expected string, given ${value}`);
      return String(value);
    case "number":
      if (isNaN(value)) throw new TypeError(`Expected number, given ${value}`);
      return Number(value);
    case "boolean":
      if (typeof value === "boolean") return value;
      if (!(value === "true" || value === "false")) throw new TypeError(`Expected boolean(true or false), given ${value}`);
      return value === "true";
    default: // select type
      if (!type.includes(String(value))) {
        throw new TypeError(`Expected one of ${type.join(", ")}, given ${value}`);
      }
      return String(value);
  }
};
