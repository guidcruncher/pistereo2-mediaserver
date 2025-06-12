"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var uri_1 = require("./uri");
var Context = /** @class */ (function () {
    function Context() {
        this.type = '';
        this.uri = new uri_1.Uri();
    }
    return Context;
}());
exports.Context = Context;
