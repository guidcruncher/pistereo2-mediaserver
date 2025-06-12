"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
var context_1 = require("./context");
var uri_1 = require("./uri");
var Show = /** @class */ (function () {
    function Show() {
        this.publisher = '';
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
    return Show;
}());
exports.Show = Show;
