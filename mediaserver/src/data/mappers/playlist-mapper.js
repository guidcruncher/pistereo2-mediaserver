"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistMapper = void 0;
var playlist_1 = require("../views/playlist");
var uri_1 = require("../views/uri");
var mapper_1 = require("./mapper");
var profile_mapper_1 = require("./profile-mapper");
var PlaylistMapper = function (value) {
    var result = new playlist_1.PlaylistDefinition();
    result.uri = uri_1.Uri.fromUriString(value.uri);
    result.name = value.name;
    result.description = value.description;
    result.owner = (0, profile_mapper_1.ProfileMapper)(value.owner);
    result.imageUrl = '';
    result.imageUrl = (0, mapper_1.imageUrl)(value.images);
    return result;
};
exports.PlaylistMapper = PlaylistMapper;
