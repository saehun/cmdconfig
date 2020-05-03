import { command } from "yargs";


type ValidType = "string" | "boolean" | "number" | string[];

type SchemaItem = {
  type: ValidType;
  description?: string;
  shared?: boolean;
}

type Schema = Record<string, SchemaItem>;


interface ConfigType {
  asdf: number;
  qwde: string;
  zxca: "asd" | "qwd" | "qwd";
}

/* type SchemaGenerator = (s: Record<string, SchemaItem>) => SchemaItem["type"] */

const schema = (s: Schema) => {

  return s;
};

interface Option {
  filename: string;
  schema: Schema;
  profile?: string;
  base?: string;
}

const init = ({ filename, schema, profile = "default", base = "~/.config" }: Option): any => {
  console.log(process.argv);
  /*
  command("config", false, () => { }, (argv) => {
    console.log("huh");
    console.log(argv);
  });
  */
};



const cmdconfig = {
  schema,
  init,
  string: "",
  number: 0,
  boolean: true,
};

const configSchema = cmdconfig.schema({
  accessKey: { type: "string", description: "...", shared: true },
  timeout: { type: "number", description: "..." },
});

const asdf = init({
  filename: ".myappconfig",
  schema: configSchema,
});
