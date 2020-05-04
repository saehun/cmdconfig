import * as path from "path";
import * as os from "os";

export const BASE_PATH = path.join(os.homedir(), ".config");
export const BASE_CONFIG = `{
  "default": {},
  "shared": {}
}`;
