"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
var context_1 = require("./context");
var uri_1 = require("./uri");
var Album = /** @class */ (function () {
    function Album() {
        this.context = new context_1.Context();
        this.uri = new uri_1.Uri();
        this.url = '';
        this.name = '';
        this.subtitle = '';
        this.description = '';
        this.artists = [];
        this.imageUrl = '';
        this.owner = '';
    }
    Album.create = function (uri, name, artists, images) {
        var alb = new Album();
        alb.uri = uri_1.Uri.fromUriString(uri);
        alb.name = name;
        alb.artists = artists;
        alb.imageUrl = '';
        if (images) {
            if (images.length > 0) {
                alb.imageUrl = images.sort(function (a, b) { return b.height - a.height; })[0].url;
            }
        }
        return alb;
    };
    return Album;
}());
exports.Album = Album;
