goog.provide('opeth');

goog.require('prestans.rest.json.Client');

opeth = function() {};

opeth.GLOBALS = {
    API_CLIENT: new prestans.rest.json.Client({
        baseUrl: "/api",
        opt_numRetries: 0,
        opt_minified: false
    })
};