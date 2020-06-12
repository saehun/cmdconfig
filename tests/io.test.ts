import * as path from "path";
import * as fs from "fs";
import { loadOrCreate, write } from "../src/io";
const testbase = process.cwd();
const filename = ".testconfig";


// for private functions
const rewire = require("rewire");
const io = rewire("../src/io");
const load = io.__get__("load");

beforeAll(() => {
  fs.writeFileSync(path.join(testbase, filename + "0"), JSON.stringify({ key: "value" }));
});

afterAll(() => {
  fs.unlinkSync(path.join(testbase, filename + "0"));
  fs.unlinkSync(path.join(testbase, filename));
});

describe("io module", () => {

  it("can load file", () => {
    const config = JSON.parse(loadOrCreate(path.join(testbase, filename + "0"), testbase));
    expect(config).toEqual({ key: "value" });
  });

  it("can create file when the file doesn't exist", () => {
    const config = JSON.parse(loadOrCreate(path.join(testbase, filename), testbase));
    expect(config).toEqual({ "default": {}, "shared": {} });
  });

  it("can write JSON object to file", () => {
    write(path.join(testbase, filename + "0"), { "default": { key: "modified" } });
  });

  it("throw error if not exist", () => {
    expect(() => load("__file__dont_exist__")).toThrowError();
  });
});
