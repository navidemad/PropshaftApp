"use strict";

import esbuild from "esbuild";
import path from "path";
import glob from "glob";

const __dirname = path.resolve();

var entryPoints = glob
  .sync(path.resolve(__dirname, `app/javascript/*.js`))
  .reduce(function (map, filepath) {
    map[path.basename(filepath, ".js")] = [filepath];
    return map;
  }, {});

const esbuildOptions = {
  bundle: true,
  logLevel: "debug",
  entryPoints: entryPoints,
  format: "esm",
  outdir: path.resolve(__dirname, "app/assets/builds/js/modern"),
  sourcemap: false,
  minify: false,
  treeShaking: true,
  metafile: false,
  platform: "browser",
  watch: true,
  splitting: typeof process.env.ESBUILD_MODULES != "undefined",
};

esbuild
  .build(esbuildOptions)
  .catch((e) => {
    compilationError(e.message);
    process.exit(1);
  });
