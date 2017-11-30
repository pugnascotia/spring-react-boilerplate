const fs = require('fs');
const babel = require('babel-core');
const rimraf = require('rimraf');

if (fs.existsSync('./build')) {
  rimraf.sync('./build');
}

fs.mkdirSync('./build');

if (!fs.existsSync('../../app/build/asset-manifest.json')) {
  console.warn('../../app/build/asset-manifest.json does not exist - has the build run?')
  process.exit(1);
}

const output = fs.createWriteStream('./build/renderer.js');

output.write('// polyfill.js\n\n');

// Running this through Babel breaks one of the polyfills. Until I work
// that out, merge it in manually.
output.write(fs.readFileSync('./polyfill.js', 'utf8'));

// It's unreasonably difficult to load this file from the classpath at
// runtime, so I'm just adding it in at build time.
output.write('\n// asset-manifest.json\nvar assetManifest = ');
output.write(fs.readFileSync('../../app/build/asset-manifest.json', 'utf8'));
output.write(';\n\n');

output.write('\n// renderer.js\n\n');
const transformedRendererJs = babel.transformFileSync('./renderer.js', {
  "presets": ["es2015"],
  "plugins": ["transform-object-rest-spread"]
});
output.write(transformedRendererJs.code);

output.end();
