# README

This repository has been built to reproduce an issue when the javascript is from Esbuild with ESM and Splitting turned enabled.
With the option "splitting" and the format "esm" of Esbuild configuration build, we will have an output code composed of chunks and each entrypoint will import those chunks to rebuild them so we avoid to download twice the resources across two differents endpoint.

https://esbuild.github.io/api/#splitting

In the current Gemfile, there is both Propshaft and sprockets-rails, so you can compare results.
It is working with sprockets-rails (HEAD) but not yet with propshaft (HEAD).
You just have to comment/uncomment the gem in the Gemfile to test on each one.

The project is made of 2 entrypoints with in each one of them shared coded (lazysize packages).

## Usage

`./bin/dev`
> Build the assets with Esbuild (splitting: false) + javascript_include_tag without option type: "modules"
> sprockets-rails: OK
> Propshaft: OK

`ESBUILD_MODULES=1 ./bin/dev`
> Build the assets with Esbuild (splitting: true) + javascript_include_tag with option type: "modules"
> sprockets-rails: OK
> Propshaft: KO
