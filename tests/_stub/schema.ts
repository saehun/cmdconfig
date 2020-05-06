import { Schema } from "../../src/types";
export const schema0: Schema = ({
  "field1": { type: "string", description: "description1", shared: false },
  "field2": { type: "number", description: "description2", shared: false },
  "field3": { type: "boolean", description: "description1", shared: true },
  "field4": { type: ["value1", "value2", "value3"], description: "description1", shared: true },
});
