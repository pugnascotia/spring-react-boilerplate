var render = (function () {

    // http://www.slideshare.net/SpringCentral/serverside-javascript-with-nashorn-and-spring
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

    return function(template, model, url) {
        var json =  serializer.writeValueAsString(model);

        return getEJS(template, url).render({data: JSON.parse(json), json: json});
    };
})();