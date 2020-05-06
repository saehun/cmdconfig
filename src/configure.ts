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

const inline = (ctx: Context) => {
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

const prompt = async (ctx: Context) => {
  const config = {
    [ctx.profile]: {},
    shared: {},
  };

  for (const item of Object.entries(ctx.schema)) {
    // Don't ask shared configuration when profile is not 'default'
    if (ctx.profile !== "default" && item[1].shared) continue;

    const fieldKey = item[0];
    const profileKey = item[1].shared ? "shared" : ctx.profile;

    let field = {};
    field = { [fieldKey]: (await ask(...item)) };
    config[profileKey] = { ...config[profileKey], ...field };
  }

  const save = await prompts({
    type: "confirm",
    name: "yes",
    message: `save as '${ctx.profile}' profile?`,
  });

  if (save.yes) {
    write(ctx.path, mergeObject(ctx.configs, config));
  }
  process.exit(0);
};

export const configure = {
  prompt,
  inline,
};
