import { command, argv } from "yargs";
import { Context, Option, Schema, SchemaItem, ValidType } from "./types";
import * as fs from "fs";
import * as path from "path";
import { FileNotFoundError } from "./errors";

/* type SchemaGenerator = (s: Record<string, SchemaItem>) => SchemaItem["type"] */

const schema = (s: Schema) => {
  // validate schema and throw error if exist
  return s;
};



const intersect = (obj: any, obj2: any) => {
  for (const key in obj) {
    if (obj2[key] !== undefined) return true;
  }

  return false;
};

const init = ({ filename, schema, profile = "default", base = "~/.config" }: Option): any => {
  const ctx: Context = {
    filename,
    schema,
    profile,
    base,
    argv,
  };

  // save mode
  command("config", false, () => { }, (argv) => {
    if (argv.help) {
      // show help
    } else if (intersect(argv, schema)) {
      // inline configuration
    } else {
      // configure step by step with prompt
    }

    console.log(argv);
    process.exit(0);
  }).help(false).argv;

  // load mode
  return load(ctx);
};

const load = (ctx: Context) => {
  try {
    const file = fs.readFileSync(path.join(ctx.base, ctx.filename), "utf-8");
  } catch (_) {
    throw new FileNotFoundError(ctx);
  }
};

const cmdconfig = {
  schema,
  init,
  string: "",
  number: 0,
  boolean: true,
};

const configSchema = cmdconfig.schema({
  "accessKey": { type: "string", description: "...", shared: true },
  "timeout": { type: "number", description: "..." },
});

const asdf = init({
  filename: ".myappconfig",
  schema: configSchema,
});
