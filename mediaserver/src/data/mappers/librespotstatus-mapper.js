"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrespotStatusMapper = void 0;
var index_1 = require("../views/index");
var LibrespotStatusMapper = function (value) {
    var _a, _b, _c;
    var result = new index_1.PlayerStatus();
    if (!value) {
        return result;
    }
    result.source = value.source;
    result.device.id = (_a = value.device_id) !== null && _a !== void 0 ? _a : '';
    result.device.name = (_b = value.device_name) !== null && _b !== void 0 ? _b : '';
    result.device.volume = (_c = value.volume) !== null && _c !== void 0 ? _c : 0;
    result.device.active = !value.stopped;
    result.source = 'spotify';
    result.device.playing = !value.stopped && !value.paused;
    result.device.progress_ms = 0;
    if (value.track) {
        result.track = {};
        result.track.uri = index_1.Uri.fromUriString(value.track.uri);
        result.track.name = value.track.name;
        result.track.artists = value.track.artist_names;
        result.track.owner = value.track.album_name;
        result.track.imageUrl = value.track.album_cover_url;
    }
    return result;
};
exports.LibrespotStatusMapper = LibrespotStatusMapper;
