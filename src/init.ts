import { Context, Option } from "./types";
import { command, argv } from "yargs";
import { intersect } from "./utils";
import { configure } from "./configure";
import { loadOrCreate } from "./io";
import { BASE_PATH } from "./constants";
import * as _path from "path";

export const init = ({ filename, schema, profile = "default", base = BASE_PATH }: Option): any => {
  const path = _path.join(base, filename);
  const configs = JSON.parse(loadOrCreate(path, base));
  const ctx: Context = {
    filename,
    schema,
    profile,
    base,
    argv,
    configs,
    path,
  };

  // save mode
  command("config", false, () => { }, async (argv) => {
    if (argv.profile) ctx.profile = argv.profile as string;
    if (argv.help) {
      // show help
    } else if (argv.list) {
      // list
    } else {
      await configure(ctx, intersect(argv, schema));
    }

    process.exit(0);
  }).help(false).argv;

  // load mode
  /* return load(ctx); */
};
