import { Context, Config } from "./types";
import { validateType } from "./utils";

export const load = (ctx: Context): Config => {
  const shared = ctx.configs["shared"] || {};
  const config = ctx.configs[ctx.profile] || {};
  const override: Config = {};
  for (const key in ctx.argv) {
    if (key in ctx.schema) {
      override[key] = validateType(ctx.argv[key], ctx.schema[key].type);
    }
  }

  return {
    ...shared,
    ...config,
    ...override,
  };
};
