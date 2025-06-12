"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
var context_1 = require("./context");
var show_1 = require("./show");
var uri_1 = require("./uri");
var Episode = /** @class */ (function () {
    function Episode() {
        this.show = new show_1.Show();
        this.context = new context_1.Context();
        this.uri = new uri_1.Uri();
        this.url = '';
        this.owner = '';
        this.name = '';
        this.subtitle = '';
        this.description = '';
        this.artists = [];
        this.imageUrl = '';
        this.position = 0;
        this.duration = 0;
    }
    return Episode;
}());
exports.Episode = Episode;
