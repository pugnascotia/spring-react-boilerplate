/* global springReactBoilerplate, Packages */
const render = (function () {

  const serializer = (new Packages.com.fasterxml.jackson.databind.ObjectMapper()).writer();

  function getData(model) {
    const renderData = { data: {} };
    for (let key in model) {
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

  const UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g;

  // Mapping of unsafe HTML and invalid JavaScript line terminator chars to their
  // Unicode char counterparts which are safe to use in JavaScript strings.
  const ESCAPED_CHARS = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
  };

  function escapeUnsafeChars(unsafeChar) {
    return ESCAPED_CHARS[unsafeChar];
  }

  function populateTemplate(markup, head, stateAsJson) {
    const safeJson = stateAsJson.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);

    return `<!doctype html>
<html ${head.htmlAttributes.toString()}>
  <head>
    ${ head.base.toString() }
    ${ head.link.toString() }
    ${ head.meta.toString() }
    ${ head.title.toString() }
  </head>
  <body>
    <div id="mount">${markup}</div>
    <script type="text/javascript">window.__INITIAL_STATE__ = ${safeJson}</script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js">
    </script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
     integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
   <script type="text/javascript" src="/app/bundle.js"></script>
 </body>
</html>`;
  }

  // Spring calls the function with the view name and data, but we don't
  // use the former
  return function(_viewName, model) {
    const { requestPath, data, json } = getData(model);

    const { markup, head } = springReactBoilerplate.renderApp(requestPath, data);

    return populateTemplate(markup, head, json);
  };
})();
