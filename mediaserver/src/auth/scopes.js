"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScopes = exports.scopes = void 0;
exports.scopes = [
    'streaming',
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-private',
    'user-read-recently-played',
    'user-follow-read',
    'user-library-read',
    'user-top-read',
];
var getScopes = function () {
    var r = {};
    exports.scopes.forEach(function (scope) {
        r[scope] = scope;
    });
    return r;
};
exports.getScopes = getScopes;
