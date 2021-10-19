<h1 align="center">Command line configuration</h1>

<p align="center">
  <a href="https://npmjs.org/package/cmdconfig">
    <img src="https://img.shields.io/npm/v/cmdconfig.svg" alt="version" />
  </a>
  <a href="https://npmjs.org/package/cmdconfig">
    <img src="https://img.shields.io/npm/dm/cmdconfig.svg" alt="downloads" />
  </a>
</p>

<p align="center">
  <b>Simple configuration CLI generator</b></br>
  <sub>Declare schema, provide both argument and interactive configuration CRUD.</sub>
</p>

<br />

- **Simple**: Only have 2 API. declare schema and initialize with few options.
- **Versatile**: Provides both prompt and inline configurations.
- **Extensible**: Supports environment variable, command line profile overriding.
- **reliable**: Typecheck for each properties.

## Install

``` shell
$ npm install --save cmdconfig
```

## Usage
Let's assume that we are building an office CLI tool which interact with S3. We need to save the user's configuration in local file, implementing functionality similar to `git config` `aws config`.

![config-prompt](https://github.com/minidonut/cmdconfig/raw/master/docs/config-prompt.png)

``` javascript
// myapp.js
const cmdconfig = require("cmdconfig");

const configSchema = cmdconfig.schema({
  "username": { type: "string", description: "Name of the user" },
  "bucketRegion": { type: ["us-east-1", "ap-northeast-2", "eu-west-1"], description: "Primary region of the bucket" },
  "timeout": { type: "number", description: "Request timeout in seconds", shared: true },
  "localCache": { type: "boolean", description: "Save files to a local directory", shared: true },
});

const config = cmdconfig.init({
  filename: ".myappconfig",
  schema: configSchema,
});

console.log(config);
```

![config-result](https://github.com/minidonut/cmdconfig/raw/master/docs/config-result.png)

## Features
After implemented, `config` command is reserved. commands with options `config --help` and `config --list` are auto generated. If the program starts with `config` command, it's execution will be stopped after configuration procedure is done.

### Inline configuration
``` shell
$ myapp config --cache=false --bucketRegion=eu-west-1
```

### Profile management
Save and load configs by profile with `profile=PROFILE_NAME` option.

``` shell
$ myapp config --profile=dev
✔ username … katarina/dev
✔ region › ap-northeast-2
✔ save as 'dev' profile? … yes
$ myapp --profile=dev
{
  username: 'katarina/dev',
  bucketRegion: 'ap-northeast-2',
  timeout: 30,
  localCache: true
}
```

### Environment variable

``` javascript
// myapp.js
...
const config = cmdconfig.init({
  filename: ".myappconfig",
  schema: configSchema,
  profile: process.env.MY_APP_PROFILE,
});
...
```

``` shell
$ MY_APP_PROFILE=dev myapp
{
  username: 'katarina/dev',
  bucketRegion: 'ap-northeast-2',
  timeout: 30,
  localCache: true
}
```

### Overriding

``` shell
$ myapp --username=katarina/test --localCache=false
{
  username: 'katarina/test',
  bucketRegion: 'us-east-1',
  timeout: 30,
  localCache: false
}
```


### Change base directory and filename
Change location where the configuration file is saved.
Save file to `~/.dotfiles/.myappconf` (default `~/.config`):

``` javascript
// myapp.js
const os = require("os");
const path = require("path");
...
const config = cmdconfig.init({
  filename: ".myappconf",
  schema: configSchema,
  base: path.join(os.homedir(), ".dotfiles"),
});
...
```


### Help
``` shell
$ myapp config --help
Options:
  --help             Show help                                         [boolean]
  --list             Show list                                         [boolean]
  --username         Name of the user                                   [string]
  --bucketRegion     Primary region of the bucket                       [string]
  --timeout          Request timeout in seconds                         [number]
  --localCache       Save files to a local directory                   [boolean]
```


### List
Print all configuration details in yaml format.
``` shell
$ myapp config --list
/Users/$USER/.config/.myappconfig
default:
  username: katarina
  bucketRegion: us-east-1
dev:
  username: katarina/dev
  bucketRegion: ap-northeast-2
shared:
  timeout: 30
  localCache: false
```

## API
### cmdconfig.schema(Schema s)
return: `Schema`

Validate given schema object.

### cmdconfig.init(Option o)
return: `config object`<br>
**config object**: plain javascript object with key, value map.

Parse commandline argument. if `config` command exist, it saves the configuration and exit. Else, it loads the configuration and provides.


## Type
### `Schema`
| Key | Type | Description |
| ----- | :--: | ----------- |
| key1 | `SchemaItem` | Schema Item for key#1  |
| key2 | `SchemaItem` | Schema Item for key#2  |
| key3 | `SchemaItem` | Schema Item for key#3  |
| ... | ... | ... |
| keyN | `SchemaItem` | Schema Item for keyN  |

### `SchemaItem`
| Key | Type | Description |
| ----- | :--: | ----------- |
| type | `"string"`, `"number"`, `"boolean"`, `string[]` | type of config's property. Note) "number" is string literal. not a number type. |
| description | `string` | (Optional) property description. It appears in `--help` command  |
| shared | `boolean` | (Optional) whether the property belongs to profile or shared |

### `Option`
| Key | Type | Description |
| ----- | :--: | ----------- |
| filename | `string` | configuration file name. ex) `".myappconfig"`  |
| schema | `Schema` | Validated schema object. returned from cmdconfig.schema API |
| profile | `string` | (Optional) pass value from environment variable. ex) `process.env.MY_APP_CONFIG` |
| base | `string` | (Optional) where config file stored. default `path.join(os.homedir(), ".config")` (~/.config) |


## Typescript
This package is written in typescript, generating output type from schema is not supported yet (work in progress).

### Example
``` typescript
// src/config.ts
import * as cmdconfig from "cmdconfig";

const configSchema = cmdconfig.schema({
  "username": { type: "string", description: "Name of the user" },
  "bucketRegion": { type: ["us-east-1", "ap-northeast-2", "eu-west-1"], description: "Primary region of the bucket" },
  "timeout": { type: "number", description: "Request timeout in seconds" shared: true },
  "localCache": { type: "boolean", description: "Save files to a local directory" shared: true },
});

export default cmdconfig.init({
  filename: ".myappconfig",
  schema: configSchema,
}) as {
  username: string;
  bucketRegion: "us-east-1" | "ap-northeast-2" | "eu-west-1";
  timeout: number;
  localCache: boolean;
};


// src/index.ts
import config from "./config";

console.log(config);
...
```


## License
MIT
