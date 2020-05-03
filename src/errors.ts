import { Context } from "./types";
import * as path from "path";

export class BaseError extends Error {
}

export class FileNotFoundError extends BaseError {
  constructor(ctx: Context) {
    super();
    this.name = "FileNotFoundError";
    this.message = `Configuration file doesn't exist at path ${path.join(ctx.base, ctx.filename)}

    ${ctx.argv["$0"]} config
    `;

  }
}
