"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = void 0;
var context_1 = require("./context");
var uri_1 = require("./uri");
var Stream = /** @class */ (function () {
    function Stream() {
        this.context = new context_1.Context();
        this.uri = new uri_1.Uri();
        this.url = '';
        this.name = '';
        this.subtitle = '';
        this.owner = '';
        this.description = '';
        this.artists = [];
        this.imageUrl = '';
    }
    return Stream;
}());
exports.Stream = Stream;
