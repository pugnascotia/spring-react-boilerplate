var render = (function () {

    // http://www.slideshare.net/SpringCentral/serverside-javascript-with-nashorn-and-spring
    var serializer = (new Packages.com.fasterxml.jackson.databind.ObjectMapper()).writer();

    return function(template, model) {
        var json =  serializer.writeValueAsString(model);

        return new EJS({text: template}).render({data: JSON.parse(json), json: json});
    };
})();