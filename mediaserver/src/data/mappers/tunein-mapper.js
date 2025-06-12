"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuneinMapper = void 0;
var tunein_1 = require("../views/tunein");
var uri_1 = require("../views/uri");
var TuneinMapper = function (value) {
    var _a, _b, _c, _d;
    var result = new tunein_1.Tunein();
    result.uri = uri_1.Uri.fromUriString('tunein:station:' + value.GuideId);
    result.name = value.Title;
    result.owner = (_a = value.Subtitle) !== null && _a !== void 0 ? _a : '';
    result.subtitle = (_b = value.Subtitle) !== null && _b !== void 0 ? _b : '';
    result.description = (_c = value.Description) !== null && _c !== void 0 ? _c : '';
    result.url = (_d = value.url) !== null && _d !== void 0 ? _d : '';
    result.imageUrl = value.Image;
    return result;
};
exports.TuneinMapper = TuneinMapper;
