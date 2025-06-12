"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresetMapper = void 0;
var index_1 = require("../views/index");
var PresetMapper = function (value) {
    var result = {};
    result.uri = index_1.Uri.fromUriString(value.id);
    result.owner = value.owner;
    result.uri = value.uri;
    result.url = value.url;
    result.name = value.name;
    result.subtitle = value.subtitle;
    result.description = value.description;
    result.artists = value.artists;
    result.imageUrl = value.imageUrl;
    return result;
};
exports.PresetMapper = PresetMapper;
