#!/usr/bin/env jjs
/* eslint-env nashorn */
/* eslint-disable no-var, prefer-template */

var ROOT = './src/main/resources/static';

print('Loading polyfill...');

try {
  load(ROOT + '/js/polyfill.js');
}
catch (e) {
  print('Failed to load polyfill: ' + e);
  print(e.stack);
  exit(1);
}

print('Loading bundle...');

try {
  load(ROOT + '/app/bundle.js');
}
catch (e) {
  print('Failed to load bundle: ' + e);
  print(e.stack);
  exit(1);
}

print('Success!');
exit(0);
