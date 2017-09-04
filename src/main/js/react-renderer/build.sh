#!/bin/bash

set -eo pipefail

realpath () {
  [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

do_build() {
  # Running this through Babel breaks one of the polyfills. Until I work
  # that out, merge it in manually.
  echo '// polyfill.js'
  echo
  cat polyfill.js

  # It's unreasonably difficult to load this file from the classpath at
  # runtime, so I'm just adding it in at build time.
  echo
  echo '// asset-manifest.json'
  echo -n "var assetManifest = "
  cat ../../app/build/asset-manifest.json
  echo ";"
  echo

  echo
  echo '// renderer.js'
  echo
  ./node_modules/.bin/babel renderer.js
}

cd "$(dirname "$(realpath "$0")")"

if [ ! -e ../../app/build/asset-manifest.json ]; then
  echo "../../app/build/asset-manifest.json does not exist - has the build run?"
  exit 1
fi

rm -rf build
mkdir -p build

do_build > build/renderer.js
