"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistDefinition = void 0;
var index_1 = require("./index");
var PlaylistDefinition = /** @class */ (function () {
    function PlaylistDefinition() {
        this.uri = new index_1.Uri();
        this.name = '';
        this.description = '';
        this.owner = new index_1.Profile();
        this.imageUrl = '';
    }
    return PlaylistDefinition;
}());
exports.PlaylistDefinition = PlaylistDefinition;
