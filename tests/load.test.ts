import { load } from "../src/load";
import { schema0, config0 } from "./_stub/schema";

describe("load module", () => {
  it("can load config", () => {
    expect(
      load({
        argv: {},
        configs: config0,
        schema: schema0,
        filename: "",
        path: "",
        base: "",
        profile: "default",
      })
    ).toEqual({
      field1: "value1",
      field2: 0,
      field3: false,
      field4: "value3"
    });
  });
});
