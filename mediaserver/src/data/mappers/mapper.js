"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUrl = void 0;
var imageUrl = function (images) {
    if (images) {
        if (images.length > 0) {
            var h_1 = images
                .map(function (i) {
                return i.height;
            })
                .sort()
                .pop();
            return images.find(function (i) {
                return i.height == h_1;
            }).url;
        }
    }
    return '';
};
exports.imageUrl = imageUrl;
