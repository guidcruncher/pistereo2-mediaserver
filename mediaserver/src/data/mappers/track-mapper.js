"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackMapper = void 0;
var track_1 = require("../views/track");
var uri_1 = require("../views/uri");
var mapper_1 = require("./mapper");
var TrackMapper = function (value) {
    var _a, _b, _c;
    var result = new track_1.Track();
    result.uri = uri_1.Uri.fromUriString(value.uri);
    result.name = value.name;
    result.imageUrl = '';
    result.position = (_a = value.position) !== null && _a !== void 0 ? _a : 0;
    result.duration = (_b = value.duration) !== null && _b !== void 0 ? _b : 0;
    if (value.artists) {
        result.artists = value.artists.map(function (a) { return a.name; });
    }
    result.owner = value.album.name;
    if (value.album.uri) {
        result.album.uri = uri_1.Uri.fromUriString(value.album.uri);
    }
    result.album.name = value.album ? ((_c = value.album.name) !== null && _c !== void 0 ? _c : '') : '';
    result.album.imageUrl = '';
    if (value.album) {
        result.album.imageUrl = (0, mapper_1.imageUrl)(value.album.images);
    }
    result.imageUrl = result.album.imageUrl;
    if (value.images) {
        result.imageUrl = (0, mapper_1.imageUrl)(value.images);
    }
    if (value.album.artists) {
        result.album.artists = value.album.artists.map(function (a) { return a.name; });
    }
    result.artists = result.album.artists;
    if (value.artists) {
        result.artists = value.artists.map(function (a) { return a.name; });
    }
    return result;
};
exports.TrackMapper = TrackMapper;
