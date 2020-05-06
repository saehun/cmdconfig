<p align="center">
  <img src="https://github.com/minidonut/cmdconfig/raw/master/logo.png" alt="Cmdconfig" width="600" />
</p>

<h1 align="center">Command line configuration</h1>

<p align="center">
  <a href="https://npmjs.org/package/cmdconfig">
    <img src="https://img.shields.io/npm/v/cmdconfig.svg" alt="version" />
  </a>
  <a href="https://npmjs.org/package/prompts">
    <img src="https://img.shields.io/npm/dm/cmdconfig.svg" alt="downloads" />
  </a>
</p>

<p align="center">
  <b>Simple configuration CLI generator</b></br>
  <sub>Declare schema, provides both argument and interactive configuration CRUD.</sub>
</p>

<br />

- **Simple**: Only have 2 API. declare schema and initialize with few options.
- **Versatile**: Provides both prompt and inline configuration.
- **Extensible**: Supports environment variable, command line profile overriding.

## Install

``` shell
$ npm install --save cmdconfig
```

## Usage
Let's assume that we are building office CLI tool which interact with S3. We need to save the user's configuration in local file, implementing functionality simlar to `git config` `aws config`.

![config-prompt](https://github.com/minidonut/cmdconfig/raw/master/docs/config-prompt.png)

``` javascript
// myapp.js
const cmdconfig = require("cmdconfig");

const configSchema = cmdconfig.schema({
  "username": { type: "string", description: "Name of the user" },
  "bucketRegion": { type: ["us-east-1", "ap-northeast-2", "eu-west-1"], description: "Primary region of the bucket" },
  "timeout": { type: "number", description: "Request timeout in seconds" shared: true },
  "localCache": { type: "boolean", description: "Save files in a local directory" shared: true },
});

const config = cmdconfig.init({
  filename: ".myappconfig",
  schema: configSchema,
});

console.log(config);
```

![config-result](https://github.com/minidonut/cmdconfig/raw/master/docs/config-result.png)

## Examples
