import { Schema } from "./types";
import { } from "./errors";

const getMaxLength = (str: string[]) => {
  return Math.max(...str.map(x => x.length));
};

const LINE_WIDTH = 80;
export const help = (schema: Schema): string => {
  const keyLength = getMaxLength(Object.keys(schema));
  const lines = [
    "Options:",
    `  --${"help".padEnd(keyLength)}  ${"Show help".padEnd(LINE_WIDTH - keyLength - 7 - 10)}  [boolean]`,
    `  --${"list".padEnd(keyLength)}  ${"Show list".padEnd(LINE_WIDTH - keyLength - 7 - 10)}  [boolean]`,
  ];
  for (const [key, item] of Object.entries(schema)) {
    const typeLength = typeof item.type === "object" ? 6 : item.type.length;
    const descriptionLength = Math.max(LINE_WIDTH - keyLength - typeLength - 10, 20);
    lines.push(
      `  --${key.padEnd(keyLength)}  ${item.description.padEnd(descriptionLength)}  [${typeof item.type === "object" ? "string" : item.type}]`,
    );
  }

  return lines.join("\n");
};
