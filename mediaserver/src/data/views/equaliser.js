"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixer = exports.Frequency = exports.Channel = void 0;
var Channel = /** @class */ (function () {
    function Channel() {
        this.name = '';
        this.value = 60;
    }
    return Channel;
}());
exports.Channel = Channel;
var Frequency = /** @class */ (function () {
    function Frequency() {
        this.numid = 0;
        this.min = 0;
        this.max = 100;
        this.steps = 1;
        this.name = '';
        this.title = '';
        this.channels = [];
        this.value = 0;
    }
    return Frequency;
}());
exports.Frequency = Frequency;
var Mixer = /** @class */ (function () {
    function Mixer() {
        this.frequencies = [];
        this.device = '';
    }
    Mixer.prototype.add = function (numid, name, channels, min, max, steps) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 100; }
        if (steps === void 0) { steps = 1; }
        this.frequencies.push({
            numid: numid,
            min: min,
            max: max,
            steps: steps,
            name: name,
            title: name.slice(name.indexOf(' ')).replaceAll(' Playback Volume', '').trim(),
            channels: channels,
            value: channels[0].value,
        });
    };
    return Mixer;
}());
exports.Mixer = Mixer;
