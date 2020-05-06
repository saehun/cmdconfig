import { base64 } from "../src/base64";

describe("base64", () => {
  const obj = {
    key1: "value1",
    key2: 0,
    key3: false,
    key4: ["value2", "value3", "value4"],
    key5: {
      key6: "value5",
    },
  };
  it("can encode object", () => {
    expect(typeof base64.encode(obj)).toEqual("string");
  });

  it("can decode base64 to object", () => {
    expect(base64.decode(base64.encode(obj))).toEqual(obj);
  });
});
