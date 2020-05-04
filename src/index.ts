import { init } from "./init";
import { schema } from "./schema";

const cmdconfig = {
  schema,
  init,
};

const configSchema = cmdconfig.schema({
  "accessKey": { type: "string", description: "..." },
  "secretAccessKey": { type: "string", description: "..." },
  "timeout": { type: "number", description: "...", shared: true },
});

const asdf = init({
  filename: ".myappconfig",
  schema: configSchema,
});
