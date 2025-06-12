"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowMapper = void 0;
var show_1 = require("../views/show");
var uri_1 = require("../views/uri");
var mapper_1 = require("./mapper");
var ShowMapper = function (value) {
    var result = new show_1.Show();
    result.uri = uri_1.Uri.fromUriString(value.uri);
    result.name = value.name;
    result.owner = value.name;
    result.imageUrl = '';
    result.imageUrl = (0, mapper_1.imageUrl)(value.images);
    result.description = value.description;
    result.publisher = value.publisher;
    return result;
};
exports.ShowMapper = ShowMapper;
