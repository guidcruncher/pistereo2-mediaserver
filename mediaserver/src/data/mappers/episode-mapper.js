"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeMapper = void 0;
var episode_1 = require("../views/episode");
var uri_1 = require("../views/uri");
var mapper_1 = require("./mapper");
var EpisodeMapper = function (value) {
    var _a, _b;
    var result = new episode_1.Episode();
    result.uri = uri_1.Uri.fromUriString(value.uri);
    result.name = value.name;
    result.imageUrl = '';
    result.description = value.description;
    result.position = (_a = value.position) !== null && _a !== void 0 ? _a : 0;
    result.duration = (_b = value.duration) !== null && _b !== void 0 ? _b : 0;
    if (value.show) {
        if (value.show.uri && value.show.uri != '') {
            result.show.uri = uri_1.Uri.fromUriString(value.show.uri);
        }
        result.show.imageUrl = '';
        result.show.imageUrl = (0, mapper_1.imageUrl)(value.show.images);
        result.show.description = value.show.description;
        result.show.publisher = value.show.publisher;
        result.owner = value.show.name;
        result.show.name = value.show.name;
    }
    result.imageUrl = result.show.imageUrl;
    if (value.images) {
        result.imageUrl = (0, mapper_1.imageUrl)(value.images);
    }
    return result;
};
exports.EpisodeMapper = EpisodeMapper;
