#!/usr/bin/env node
import { configure } from "./configure";
import { base64 } from "./base64";
import { argv } from "yargs";

configure.prompt(base64.decode(argv.ctx as string));
