import { intersect, mergeObject, validateType } from "../src/utils";

test("intersect can check whether two objects have same key", () => {
  expect(intersect(
    { key1: "value1", key2: "value2" },
    { key1: "value1" },
  )).toBeTruthy();
});

test("intersect can check whether two objects have same key", () => {
  expect(intersect(
    { key1: "value1", key2: "value2" },
    { key3: "value1" },
  )).toBeFalsy();
});

test("mergeObject can merge two object. overwrite obj1 over obj2", () => {
  expect(mergeObject(
    { profile1: { key1: "value1", key2: "value2" }, profile2: { key3: "value3" } },
    { profile1: { key1: "value3" }, profile2: { key4: "value4" } },
  )).toEqual({
    profile1: { key1: "value3", key2: "value2" },
    profile2: { key3: "value3", key4: "value4" },
  });

  expect(mergeObject(
    {},
    { profile1: { key1: "value3" }, profile2: { key4: "value4" } },
  )).toEqual({
    profile1: { key1: "value3" },
    profile2: { key4: "value4" },
  });
});

describe("validateType", () => {

  it("can validate number type", () => {
    expect(() => validateType(NaN, "number")).toThrowError(TypeError);
  });

  it("can validate boolean type", () => {
    expect(validateType("true", "boolean")).toBeTruthy();
    expect(validateType("false", "boolean")).toBeFalsy();
    expect(() => validateType(0, "boolean")).toThrowError(TypeError);
  });

  it("can validate select type", () => {
    expect(() => validateType("value0", ["value1", "value2"])).toThrowError(TypeError);
  });
});
