"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedList = void 0;
var pager_1 = require("./pager");
var PagedList = /** @class */ (function () {
    function PagedList() {
        this.paging = new pager_1.Pager();
        this.items = [];
    }
    return PagedList;
}());
exports.PagedList = PagedList;
