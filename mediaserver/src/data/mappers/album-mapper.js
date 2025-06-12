"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumMapper = void 0;
var album_1 = require("../views/album");
var uri_1 = require("../views/uri");
var mapper_1 = require("./mapper");
var AlbumMapper = function (value) {
    var result = new album_1.Album();
    result.uri = uri_1.Uri.fromUriString(value.uri);
    result.name = value.name;
    result.imageUrl = '';
    result.owner = value.name;
    if (value.images) {
        result.imageUrl = (0, mapper_1.imageUrl)(value.images);
    }
    if (value.artists) {
        result.artists = value.artists.map(function (a) { return a.name; });
    }
    return result;
};
exports.AlbumMapper = AlbumMapper;
