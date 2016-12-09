var render = (function () {

  var serializer = (new Packages.com.fasterxml.jackson.databind.ObjectMapper()).writer();

  function getData(model) {
    var renderData = { data: {} };
    for (var key in model) {
      if (key.startsWith("__")) {
        renderData[ key.substring(2) ] = model[key];
      }
      else {
        renderData.data[key] = model[key];
      }
    }

    /* Serialise the model for passing to the client. We don't use JSON.stringify
     * because Nashorn's version doesn't cope with POJOs by design.
     *
     * http://www.slideshare.net/SpringCentral/serverside-javascript-with-nashorn-and-spring
     */
    renderData.json = serializer.writeValueAsString(renderData.data);

    /* "Purify" the model by swapping it for the serialised version */
    renderData.data = JSON.parse(renderData.json);

    return renderData;
  }

  // https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0#.a9ljcm13e
  // Ensure dehydrated state is safe to read on the browser. Here I'm just pinching code from
  // the `serialize-javascript` npm module.

  var UNSAFE_CHARS_REGEXP   = /[<>\/\u2028\u2029]/g;

  // Mapping of unsafe HTML and invalid JavaScript line terminator chars to their
  // Unicode char counterparts which are safe to use in JavaScript strings.
  var ESCAPED_CHARS = {
    '<'     : '\\u003C',
    '>'     : '\\u003E',
    '/'     : '\\u002F',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
  };

  function escapeUnsafeChars(unsafeChar) {
    return ESCAPED_CHARS[unsafeChar];
  }

  function populateTemplate(rendered, stateAsJson) {
    var safeJson = stateAsJson.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);

    return '<!DOCTYPE html>' +
      '<html lang="en">' +
      '<head>' +
        '<meta charset="utf-8"/>' +
        '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
        '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
        '<title>React Demo</title>' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" ' +
              'integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous" />' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" ' +
              'integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous" />' +
        '<link rel="stylesheet" href="/app/bundle.css" />' +
      '</head>' +
      '<body>' +
        '<div id="mount">' + rendered + '</div>' +
        '<script type="text/javascript">' +
          'window.__INITIAL_STATE__ = ' + safeJson +
        '</script>' +
        '<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>' +
        '<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" ' +
        'integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>' +
        '<script type="text/javascript" src="/app/bundle.js"></script>' +
      '</body>' +
      '</html>';
  }

  return function(template, model) {
    var restructured = getData(model);

    var rendered = ReactDemo.renderApp(restructured.requestPath, restructured.data);

    return populateTemplate(rendered, restructured.json);
  };
})();
