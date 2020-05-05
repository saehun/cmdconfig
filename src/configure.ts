import { Context, SchemaItem } from "./types";
import { write } from "./io";
import * as prompts from "prompts";
import { mergeObject, validateType } from "./utils";

const ask = async (key: string, item: SchemaItem): Promise<any> => {

  const type = item.type === "string" ? "text"
    : item.type === "boolean" ? "confirm"
      : item.type === "number" ? "number"
        : "select";

  const choices: any = type === "select" ? { choices: item.type } : {};

  const result = Object.values(await prompts({
    name: key,
    type,
    message: key,
    ...choices,
  }, { onCancel: () => { process.exit(0); } }))[0];

  if (type === "select") {
    return item.type[result];
  } else {
    return result;
  }
};

export const configure = async (ctx: Context, inline?: boolean) => {
  const config = {
    [ctx.profile]: {},
    shared: {},
  };

  for (const item of Object.entries(ctx.schema)) {
    const fieldKey = item[0];
    const profileKey = item[1].shared ? "shared" : ctx.profile;

    if (inline && ctx.argv[fieldKey] === undefined) continue;
    let field = {};

    if (inline) {
      field = { [fieldKey]: validateType(ctx.argv[fieldKey], item[1].type) };
    } else {
      field = { [fieldKey]: (await ask(...item)) };
    }

    config[profileKey] = { ...config[profileKey], ...field };
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
