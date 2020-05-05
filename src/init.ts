import { Context, Option } from "./types";
import { command, argv, help } from "yargs";
import { intersect } from "./utils";
import { configure } from "./configure";
import { loadOrCreate } from "./io";
import { load } from "./load";
import { BASE_PATH } from "./constants";
import * as _path from "path";
help(false);

export const init = ({ filename, schema, base = BASE_PATH }: Option): any => {
  const path = _path.join(base, filename);
  const configs = JSON.parse(loadOrCreate(path, base));
  const ctx: Context = {
    profile: (argv.profile as string) || "default",
    filename,
    schema,
    base,
    argv,
    configs,
    path,
  };

  // Configuration mode
  command("config", false, () => { }, (argv) => {
    if (argv.help) {
      console.log("hmm?");
      // show help
    } else if (argv.list) {
      // list
    } else {
      configure(ctx);
    }
    process.exit(0);
  }).help(false).argv;

  console.log("load!");

  // load mode
  return load(ctx);
};
