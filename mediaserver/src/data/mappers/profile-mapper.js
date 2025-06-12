"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileMapper = void 0;
var profile_1 = require("../views/profile");
var mapper_1 = require("./mapper");
var ProfileMapper = function (value) {
    var result = new profile_1.Profile();
    result.imageUrl = (0, mapper_1.imageUrl)(value.images);
    result.id = value.id;
    result.uri = value.uri;
    result.email = value.email;
    result.name = value.display_name;
    result.country = value.country;
    return result;
};
exports.ProfileMapper = ProfileMapper;
