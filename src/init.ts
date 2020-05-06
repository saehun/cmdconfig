import { command, argv, help as _help } from "yargs";
import { execSync } from "child_process";
import * as _path from "path";
import * as yaml from "yaml";
import { Context, Option, Config } from "./types";
import { intersect } from "./utils";
import { configure } from "./configure";
import { loadOrCreate } from "./io";
import { load } from "./load";
import { BASE_PATH } from "./constants";
import { base64 } from "./base64";
import { help } from "./help";
_help(false);

export const init = ({ filename, schema, base = BASE_PATH, profile = "default" }: Option): Config => {
  const path = _path.join(base, filename);
  const configs = JSON.parse(loadOrCreate(path, base));
  const ctx: Context = {
    profile: (argv.profile as string) || profile,
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
      // show help
      console.log(help(schema));
    } else if (argv.list) {
      // list
      console.log(`${ctx.path}\n` + yaml.stringify(configs));
    } else if (intersect(argv, schema)) {
      configure.inline(ctx);
    } else {
      // Yet prompts are async, execute child process to make it synchronous.
      // Pass context data encoded with base64.
      execSync(`npx cmdconfig --ctx="${base64.encode(ctx)}"`, { stdio: "inherit" });
    }
    process.exit(0);
  }).help(false).argv;

  // load mode
  return load(ctx);
};
