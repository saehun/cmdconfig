import { Context, Option } from "./types";
import { command, argv } from "yargs";
import { intersect } from "./utils";
import { configure } from "./configure";
import { loadOrCreate } from "./io";
import { load } from "./load";
import { BASE_PATH } from "./constants";
import * as _path from "path";

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
  command("config", false, () => { }, async (argv) => {
    if (argv.help) {
      // show help
    } else if (argv.list) {
      // list
    } else {
      // configure inline or with prompts
      configure(ctx, intersect(argv, schema));
    }
    process.exit(0);
  }).help(false).argv;

  // load mode
  return load(ctx);
};
