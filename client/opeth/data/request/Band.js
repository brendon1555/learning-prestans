goog.provide('opeth.data.request.Band');

goog.require('prestans.net.HttpMethod');
goog.require('prestans.rest.json.Request');
goog.require('opeth.data.model.Band');


opeth.data.request.Band.fetchAll = function() {
    var config_ = {
        identifier: "BandFetchAll",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: opeth.data.model.Band,
        isArray: true,
        urlFormat: "/band"
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Band.fetchSingle = function(bandId) {
    var config_ = {
        identifier: "BandFetchSingle",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: opeth.data.model.Band,
        isArray: false,
        urlFormat: "/band/%i",
        urlArgs: [bandId]
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Band.create = function(band, opt_filter) {
    var opt_filter = new opeth.data.filter.Band(false);
    opt_filter.enableName();
    var config_ = {
        identifier: "BandCreate",
        httpMethod: prestans.net.HttpMethod.POST,
        requestModel: band,
        requestFilter: opt_filter,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/band",
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Band.delete = function(bandId) {
    var config_ = {
        identifier: "BandDelete",
        httpMethod: prestans.net.HttpMethod.DELETE,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/band/%i",
        urlArgs: [bandId]
    };
    return new prestans.rest.json.Request(config_);
};