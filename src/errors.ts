
export class BaseError extends Error {
}

export class FileNotFoundError extends BaseError {
  constructor(path: string) {
    super();
    this.name = "FileNotFoundError";
    this.message = `Configuration file doesn't exist at path ${path}`;
  }
}
