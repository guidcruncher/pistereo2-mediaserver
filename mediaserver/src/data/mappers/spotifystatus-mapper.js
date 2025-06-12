"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyStatusMapper = void 0;
var index_1 = require("../views/index");
var mapper_1 = require("./mapper");
var SpotifyStatusMapper = function (value) {
    var _a, _b, _c, _d;
    var result = new index_1.PlayerStatus();
    if (!value) {
        return result;
    }
    result.source = value.source;
    if (value.device) {
        result.device.id = (_a = value.device.id) !== null && _a !== void 0 ? _a : '';
        result.device.name = (_b = value.device.name) !== null && _b !== void 0 ? _b : '';
        result.device.volume = (_c = value.device.volume_percent) !== null && _c !== void 0 ? _c : 0;
        result.device.active = value.device.is_active;
    }
    result.device.playing = value.is_playing;
    result.device.progress_ms = (_d = value.progress_ms) !== null && _d !== void 0 ? _d : 0;
    if (value.context) {
        result.track.context = new index_1.Context();
        result.track.context.type = value.context.type;
        result.track.context.uri = value.context.uri;
    }
    if (value.item) {
        switch (value.currently_playing_type) {
            case 'track':
                result.track.uri = index_1.Uri.fromUriString(value.item.uri);
                result.track.name = value.item.name;
                result.track.artists = value.item.artists.map(function (a) { return a.name; });
                result.track.imageUrl = '';
                result.track.imageUrl = (0, mapper_1.imageUrl)(value.item.album.images);
                result.track.owner = value.item.album.name;
                break;
            case 'episode':
                result.track.owner = value.item.show.name;
                result.track.uri = index_1.Uri.fromUriString(value.item.uri);
                result.track.name = value.item.name;
                result.track.artists = [value.item.show.publisher];
                result.track.imageUrl = (0, mapper_1.imageUrl)(value.item.show.images);
                if (value.item.images) {
                    result.track.imageUrl = (0, mapper_1.imageUrl)(value.item.images);
                }
                break;
        }
    }
    return result;
};
exports.SpotifyStatusMapper = SpotifyStatusMapper;
