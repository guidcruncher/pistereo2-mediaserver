"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStreamMapper = void 0;
var UserStreamMapper = function (value) {
    var result = {};
    result.uri = value.uri;
    result.name = value.name;
    result.subtitle = value.subtitle;
    result.owner = value.owner;
    result.description = value.description;
    result.artists = value.artists;
    result.imageUrl = value.imageUrl;
    result.url = value.url;
    return result;
};
exports.UserStreamMapper = UserStreamMapper;
