import { Context, SchemaItem, ValidType } from "./types";
import { write } from "./io";
import * as prompts from "prompts";
import { mergeObject } from "./utils";

const ask = async (key: string, item: SchemaItem): Promise<{ [key: string]: ValidType }> => {

  const type = item.type === "string" ? "text"
    : item.type === "boolean" ? "confirm"
      : item.type === "number" ? "number"
        : "select";

  const choices: any = type === "select" ? { choices: item.type } : {};

  return prompts({
    name: key,
    type,
    message: key,
    ...choices,
  }, { onCancel: () => { process.exit(0); } });
};

export const configure = async (ctx: Context, inline?: boolean) => {
  const config = {
    [ctx.profile]: {},
    shared: {},
  };

  for (const item of Object.entries(ctx.schema)) {
    let field = {};
    const key = item[1].shared ? "shared" : ctx.profile;
    if (inline) {
      field = ctx.argv[item[0]] ? { [item[0]]: ctx.argv[item[0]] } : {};
    } else {
      field = await ask(...item);
    }

    config[key] = { ...config[key], ...field };
  }

  const save = inline || (await prompts({
    type: "confirm",
    name: "yes",
    message: `save as '${ctx.profile}' profile?`,
  })).yes;

  if (save) {
    write(ctx.path, mergeObject(ctx.configs, config));
  } else {
    process.exit(0);
  }
};
