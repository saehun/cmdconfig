import * as path from "path";
import * as fs from "fs";
import { loadOrCreate, write } from "../src/io";
const testbase = process.cwd();
const filename = ".testconfig";

beforeAll(() => {
  fs.writeFileSync(path.join(testbase, filename + "0"), "");
});

afterAll(() => {

});

describe("io module", () => {
  it("can load file", () => {

  });

  it("can create file when the file doesn't exist", () => {
    loadOrCreate(path.join(testbase, filename), testbase);
  });

});
