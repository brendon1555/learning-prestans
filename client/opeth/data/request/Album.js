goog.provide('opeth.data.request.Album');

goog.require('prestans.net.HttpMethod');
goog.require('prestans.rest.json.Request');
goog.require('opeth.data.model.Album');


opeth.data.request.Album.fetchAll = function(bandId) {
    var config_ = {
        identifier: "AlbumFetchAll",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: opeth.data.model.Album,
        isArray: true,
        urlFormat: "/band/%i/album",
        urlArgs: [bandId]
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Album.fetchSingle = function(bandId, albumID) {
    var config_ = {
        identifier: "AlbumFetchSingle",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: opeth.data.model.Album,
        isArray: false,
        urlFormat: "/band/%i/album/%i",
        urlArgs: [bandId, albumId]
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Album.create = function(bandId, album, opt_filter) {
    //var opt_filter = new opeth.data.filter.Album(false);
    //opt_filter.enableName();
    var config_ = {
        identifier: "AlbumCreate",
        httpMethod: prestans.net.HttpMethod.POST,
        requestModel: album,
        //requestFilter: opt_filter,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/band/%i/album",
        urlArgs: [bandId]
    };
    return new prestans.rest.json.Request(config_);
};


opeth.data.request.Album.delete = function(bandId, albumId) {
    var config_ = {
        identifier: "AlbumDelete",
        httpMethod: prestans.net.HttpMethod.DELETE,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/band/%i/album/%i",
        urlArgs: [bandId, albumId]
    };
    return new prestans.rest.json.Request(config_);
};