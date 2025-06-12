"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tunein = void 0;
var album_1 = require("./album");
var context_1 = require("./context");
var uri_1 = require("./uri");
var Tunein = /** @class */ (function () {
    function Tunein() {
        this.album = new album_1.Album();
        this.context = new context_1.Context();
        this.uri = new uri_1.Uri();
        this.url = '';
        this.name = '';
        this.owner = '';
        this.subtitle = '';
        this.description = '';
        this.artists = [];
        this.imageUrl = '';
    }
    return Tunein;
}());
exports.Tunein = Tunein;
