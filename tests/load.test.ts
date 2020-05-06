import { load } from "../src/load";
import { schema0, config0 } from "./_stub/schema";

const ctx0 = {
  argv: {},
  configs: config0,
  schema: schema0,
  filename: "",
  path: "",
  base: "",
  profile: "default",
};

describe("load module", () => {
  it("can load config", () => {
    expect(load(ctx0)).toEqual({
      field1: "value1",
      field2: 0,
      field3: false,
      field4: "value3"
    });
  });

  it("can load config with profile", () => {
    expect(load({ ...ctx0, profile: "profile1" })).toEqual({
      field1: "value2",
      field2: 1,
      field3: false,
      field4: "value3"
    });
  });

  it("can overide config with optional argument", () => {
    expect(load({
      ...ctx0,
      argv: {
        field1: "value4",
        field3: true,
      },
    })).toEqual({
      field1: "value4",
      field2: 0,
      field3: true,
      field4: "value3"
    });
  });

  it("can validate type of overriding argument.", () => {
    expect(() => load({
      ...ctx0,
      argv: {
        field1: true,
      },
    })).toThrow(TypeError);
  });

  it("can overide config with optional argument", () => {
    expect(load({
      ...ctx0,
      configs: {},
      argv: {
        field1: "value1",
        field2: 0,
        field3: true,
        field4: "value3",
        field5: "ignored",
      },
    })).toEqual({
      field1: "value1",
      field2: 0,
      field3: true,
      field4: "value3",
    });
  });

});
