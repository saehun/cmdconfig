export type ValidType = "string" | "boolean" | "number" | string[];

export type SchemaItem = {
  type: ValidType;
  description?: string;
  shared?: boolean;
}

export type Schema = Record<string, SchemaItem>

export interface Option {
  filename: string;
  schema: Schema;
  profile?: string;
  base?: string;
}

export type Config = Record<string, string | number | boolean | string[]>;
export type Configs = Record<string, Config>;

export interface Context extends Option {
  argv: Record<string, any>;
  configs: Configs;
  path: string;
}
