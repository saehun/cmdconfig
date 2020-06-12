import * as fs from "fs";
import { Configs } from "./types";
import { FileNotFoundError } from "./errors";
import { BASE_CONFIG } from "./constants";

const load = (path: string) => {
  try {
    return fs.readFileSync(path, "utf-8");
  } catch (_) {
    throw new FileNotFoundError(path);
  }
};

export const loadOrCreate = (path: string, base: string, content = BASE_CONFIG) => {
  try {
    return load(path);
  } catch (_) {
    fs.mkdirSync(base, { recursive: true });
    fs.writeFileSync(path, content);
    return content;
  }
};

export const write = (path: string, configs: Configs) => {
  fs.writeFileSync(path, JSON.stringify(configs, undefined, 2));
};
