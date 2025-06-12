"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayableItemMapper = void 0;
var index_1 = require("@mappers/index");
var uri_1 = require("../views/uri");
var PlayableItemMapper = function (value) {
    var uri = {};
    if (typeof value.uri === 'string') {
        uri = uri_1.Uri.fromUriString(value.uri);
    }
    else {
        if (value.uri instanceof uri_1.Uri) {
            uri = value.uri;
        }
        else {
            throw new Error('Invalid uri type, expected string or Uri.');
        }
    }
    switch (uri.source) {
        case 'spotify':
            switch (uri.type) {
                case 'album':
                    return (0, index_1.AlbumMapper)(value);
                case 'track':
                    return (0, index_1.TrackMapper)(value);
                case 'show':
                    return (0, index_1.ShowMapper)(value);
                case 'episode':
                    return (0, index_1.EpisodeMapper)(value);
                case 'playlist':
                    return {};
            }
            break;
        case 'tunein':
            return (0, index_1.TuneinMapper)(value);
        case 'user':
            return (0, index_1.UserStreamMapper)(value);
    }
    throw new Error('Invalid input to mapper');
};
exports.PlayableItemMapper = PlayableItemMapper;
