"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
var album_1 = require("./album");
var context_1 = require("./context");
var uri_1 = require("./uri");
var Track = /** @class */ (function () {
    function Track() {
        this.album = new album_1.Album();
        this.context = new context_1.Context();
        this.uri = new uri_1.Uri();
        this.url = '';
        this.name = '';
        this.subtitle = '';
        this.owner = '';
        this.description = '';
        this.artists = [];
        this.imageUrl = '';
        this.position = 0;
        this.duration = 0;
    }
    return Track;
}());
exports.Track = Track;
