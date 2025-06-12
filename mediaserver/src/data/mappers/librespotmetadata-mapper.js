"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrespotMetadataMapper = void 0;
var index_1 = require("@mappers/index");
var uri_1 = require("../views/uri");
var LibrespotMetadataMapper = function (data) {
    var parts = data.uri.split(':');
    var uri = new uri_1.Uri();
    uri.source = parts[0];
    uri.type = parts[1];
    uri.id = parts[2];
    var value = {
        uri: uri,
        name: data.name,
        artists: data.artist_names.map(function (a) {
            return { name: a };
        }),
        duration: data.duration,
        position: data.position,
        album: {
            name: data.album_name,
            images: [{ width: 300, height: 300, url: data.album_cover_url }],
            artists: data.artist_names.map(function (a) {
                return { name: a };
            }),
        },
        show: {
            name: data.album_name,
            images: [{ width: 300, height: 300, url: data.album_cover_url }],
            artists: data.artist_names.map(function (a) {
                return { name: a };
            }),
        },
    };
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
            }
            break;
        case 'tunein':
            return (0, index_1.TuneinMapper)(value);
        case 'user':
            return (0, index_1.UserStreamMapper)(value);
    }
    throw new Error('Invalid input to mapper');
};
exports.LibrespotMetadataMapper = LibrespotMetadataMapper;
