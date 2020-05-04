import { init } from "./init";
import { schema } from "./schema";

const cmdconfig = {
  schema,
  init,
};

const configSchema = cmdconfig.schema({
  "accessKey": { type: "string", description: "...", shared: true },
  "timeout": { type: "number", description: "..." },
});

const asdf = init({
  filename: ".myappconfig",
  schema: configSchema,
});
