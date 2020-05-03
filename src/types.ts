export type ValidType = "string" | "boolean" | "number" | string[];

export type SchemaItem = {
  type: ValidType;
  description?: string;
  shared?: boolean;
}

export type Schema = Record<string, SchemaItem>;

export interface Option {
  filename: string;
  schema: Schema;
  profile?: string;
  base?: string;
}

export interface Context extends Option {
  argv: Record<string, any>;
}
