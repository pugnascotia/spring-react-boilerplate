const fs = require('fs');
const babel = require('babel-core');

if (!fs.existsSync('./build')) {
  fs.mkdirSync('./build');
}

if (!fs.existsSync('../../app/build/asset-manifest.json')) {
  return console.log('../../app/build/asset-manifest.json does not exist - has the build run?')
}

fs.writeFile('./build/renderer.js','// polyfill.js\n\n', function(err) {
  if (err) { return console.log(err); }
  fs.readFile('./polyfill.js', 'utf-8', function(err, data) {
    if (err) { return console.log(err); }
    // Running this through Babel breaks one of the polyfills. Until I work
    // that out, merge it in manually.
    fs.appendFile('./build/renderer.js', data, function (err) {
      if (err) { return console.log(err); }
      fs.appendFile('./build/renderer.js', '\n// asset-manifest.json\nvar assetManifest = \n', function (err) {
        if (err) { return console.log(err); }
        fs.readFile('../../app/build/asset-manifest.json', 'utf-8', function(err, data) {
          if (err) { return console.log(err); }
          // It's unreasonably difficult to load this file from the classpath at
          // runtime, so I'm just adding it in at build time.
          fs.appendFile('./build/renderer.js', data, function (err) {
            if (err) { return console.log(err); }
            fs.appendFile('./build/renderer.js', ';\n\n\n// renderer.js\n\n', function (err) {
              if (err) { return console.log(err); }
              fs.readFile('./renderer.js', 'utf-8', function(err, data) {
                if (err) { return console.log(err); }
                const transformedRendererJs = babel.transform(data, {
                  "presets": ["es2015"],
                  "plugins": ["transform-object-rest-spread"]
                });
                fs.appendFile('./build/renderer.js',transformedRendererJs.code, function (err) {
                  if (err) { return console.log(err); }
                });
              });
            });
          });
        });
      });
    });
  });
});
