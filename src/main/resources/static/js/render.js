var render = (function () {

    var serializer = (new Packages.com.fasterxml.jackson.databind.ObjectMapper()).writer();

    /* Basic cache implementation. Shouldn't need to worry about eviction and such
     * since we'll only use a small number of templates, given our React front-end. */
    var cache = {};

    function getEJS(template, url) {
        if (!cache[url]) {
            cache[url] = new EJS({text: template});
        }

        return cache[url];
    }

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

    return function(template, model, url) {
        return getEJS(template, url).render(getData(model));
    };
})();