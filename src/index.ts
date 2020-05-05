import { init } from "./init";
import { schema } from "./schema";

const cmdconfig = {
  schema,
  init,
};

const configSchema = cmdconfig.schema({
  "accessKey": { type: "string", description: "..." },
  "secretAccessKey": { type: "string", description: "..." },
  "region": { type: ["us-east-2", "ap-northeast-2", "eu-west-1"], description: "..." },
  "timeout": { type: "number", description: "...", shared: true },
  "cash": { type: "boolean", description: "...", shared: true },
});

const asdf = init({
  filename: ".myappconfig",
  schema: configSchema,
});
