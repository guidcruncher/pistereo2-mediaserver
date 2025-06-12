"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceProp = exports.Device = void 0;
var Device = /** @class */ (function () {
    function Device() {
        this.id = '';
        this.name = '';
        this.volume = 0;
        this.active = false;
        this.playing = false;
        this.progress_ms = 0;
    }
    return Device;
}());
exports.Device = Device;
var DeviceProp = /** @class */ (function () {
    function DeviceProp() {
        this.id = '';
        this.name = '';
        this.active = false;
    }
    return DeviceProp;
}());
exports.DeviceProp = DeviceProp;
