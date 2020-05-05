import { Context } from "./types";
import { write } from "./io";
import { mergeObject, validateType } from "./utils";

export const configure = async (ctx: Context) => {
  const config = {
    [ctx.profile]: {},
    shared: {},
  };

  for (const item of Object.entries(ctx.schema)) {
    const fieldKey = item[0];
    const profileKey = item[1].shared ? "shared" : ctx.profile;

    if (ctx.argv[fieldKey] === undefined) continue;
    let field = {};

    field = { [fieldKey]: validateType(ctx.argv[fieldKey], item[1].type) };

    config[profileKey] = { ...config[profileKey], ...field };
  }

  write(ctx.path, mergeObject(ctx.configs, config));
  process.exit(0);
};
