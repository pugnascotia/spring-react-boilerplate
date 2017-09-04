#!/usr/bin/env jjs -scripting
/* eslint-env nashorn */
/* eslint-disable no-var, prefer-template */

var polyfill = './src/main/js/react-renderer/build/polyfill.js';
var renderer = './src/main/js/react-renderer/build/renderer.js';
var appRoot = './src/main/app/build'

try {
  print('Loading renderer...');
  load(renderer);

  print('Loading manifest to locate bundle...');
  var manifest = JSON.parse(readFully(appRoot + '/asset-manifest.json'));
  var bundle = appRoot + '/' + manifest['main.js'];

  print('Loading bundle ' + bundle + ' ...');
  load(bundle);

  var markup = render(null, { '__requestPath': '/' });

  if (!markup.match(/^<!doctype html>/)) {
    print('Markup from render function does not look like HTML');
    print();
    print(markup);
    exit(1);
  }
}
catch (e) {
  print('Caught exception: ' + e);
  print(e.stack);
  exit(1);
}

print('Success!');
exit(0);
