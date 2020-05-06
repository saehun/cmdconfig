import { init } from "./init";
import { schema } from "./schema";

const configSchema = schema({
  "accessKey": { type: "string", description: "Access key of the account" },
  "secretAccessKey": { type: "string", description: "Secret access key of the account" },
  "region": { type: ["us-east-2", "ap-northeast-2", "eu-west-1"], description: "Base region" },
  "timeout": { type: "number", description: "Defualt request timeout in seconds", shared: true },
  "cache": { type: "boolean", description: "Caching result", shared: true },
});

const asdf = init({
  filename: ".myappconfig",
  schema: configSchema,
  profile: process.env.MY_APP_PROFILE,
});
console.log(asdf);
