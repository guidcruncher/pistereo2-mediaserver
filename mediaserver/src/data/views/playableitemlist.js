"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayableItemList = void 0;
var owner_1 = require("./owner");
var pagedlist_1 = require("./pagedlist");
var PlayableItemList = /** @class */ (function () {
    function PlayableItemList() {
        this.owner = new owner_1.Owner();
        this.id = '';
        this.uri = '';
        this.name = '';
        this.artists = [];
        this.imageUrl = '';
        this.type = '';
        this.items = new pagedlist_1.PagedList();
    }
    return PlayableItemList;
}());
exports.PlayableItemList = PlayableItemList;
