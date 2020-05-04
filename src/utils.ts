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
