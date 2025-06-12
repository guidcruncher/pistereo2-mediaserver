"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpvStatusMapper = void 0;
var index_1 = require("../views/index");
var MpvStatusMapper = function (value) {
    var _a, _b;
    var result = new index_1.PlayerStatus();
    if (!value) {
        return result;
    }
    result.source = 'mpv';
    result.device.id = 'mpv';
    result.device.name = 'mpv';
    result.device.volume = (_a = value.volume) !== null && _a !== void 0 ? _a : 0;
    result.device.active = value.active;
    result.device.playing = value.playing;
    result.device.progress_ms = (_b = value.position) !== null && _b !== void 0 ? _b : 0;
    result.track.url = value.url;
    return result;
};
exports.MpvStatusMapper = MpvStatusMapper;
