goog.provide('opeth.data.request.Track');

goog.require('prestans.net.HttpMethod');
goog.require('prestans.rest.json.Request');
goog.require('opeth.data.model.Track');


opeth.data.request.Track.fetchAll = function(bandId, albumId) {
    var config_ = {
        identifier: "TrackFetchAll",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: opeth.data.model.Track,
        isArray: true,
        urlFormat: "/band/%i/album/%i/track",
        urlArgs: [bandId, albumId]
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Track.fetchSingle = function(bandId, albumId) {
    var config_ = {
        identifier: "TrackFetchSingle",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: opeth.data.model.Track,
        isArray: false,
        urlFormat: "/band/%i/album/%i/track/%i",
        urlArgs: [bandId, albumId, trackId]
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Track.create = function(bandId, albumId, track, opt_filter) {
    var opt_filter = new opeth.data.filter.Track(false);
    opt_filter.enableName();
    var config_ = {
        identifier: "TrackCreate",
        httpMethod: prestans.net.HttpMethod.POST,
        requestModel: track,
        requestFilter: opt_filter,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/band/%i/album/%i/track",
        urlArgs: [bandId, albumId]
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Track.delete = function(bandId, albumId, trackId) {
    var config_ = {
        identifier: "TrackDelete",
        httpMethod: prestans.net.HttpMethod.DELETE,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/band/%i/album/%i/track/%i",
        urlArgs: [bandId, albumId, trackId]
    };
    return new prestans.rest.json.Request(config_);
};