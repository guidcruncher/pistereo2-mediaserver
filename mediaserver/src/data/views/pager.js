"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pager = void 0;
var Pager = /** @class */ (function () {
    function Pager() {
        this.offset = 0;
        this.limit = 0;
        this.total = 0;
        this.page = 0;
        this.pageCount = 0;
    }
    return Pager;
}());
exports.Pager = Pager;
