"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uri = void 0;
var Uri = /** @class */ (function () {
    function Uri() {
        this.source = '';
        this.type = '';
        this.id = '';
        this.uri = '';
    }
    Uri.prototype.toString = function () {
        return "".concat(this.source, ":").concat(this.type, ":").concat(this.id);
    };
    Uri.fromUriString = function (uri) {
        var result = new Uri();
        if (!uri) {
            return result;
        }
        if (uri.source && uri.type && uri.id) {
            result = uri;
        }
        else {
            if (typeof uri === 'string') {
                var parts = uri.split(':');
                if (parts.length != 3) {
                    throw new Error('Invalid uri structure');
                }
                result.source = parts[0];
                result.type = parts[1];
                result.id = parts[2];
                result.uri = uri;
            }
            else {
                if (uri instanceof Uri) {
                    result = uri;
                }
                else {
                    throw new Error('Invalid uri type, expected string or Uri.');
                }
            }
        }
        return result;
    };
    return Uri;
}());
exports.Uri = Uri;
