"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatus = void 0;
var device_1 = require("./device");
var PlayerStatus = /** @class */ (function () {
    function PlayerStatus() {
        this.device = new device_1.Device();
        this.track = {};
        this.source = '';
    }
    return PlayerStatus;
}());
exports.PlayerStatus = PlayerStatus;
