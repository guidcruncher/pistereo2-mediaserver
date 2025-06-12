"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioModule = void 0;
var common_1 = require("@nestjs/common");
var auth_module_1 = require("../auth/auth.module");
var core_module_1 = require("../core/core.module");
var data_module_1 = require("../data/data.module");
var mpv_module_1 = require("../mpv/mpv.module");
var spotify_module_1 = require("../spotify/spotify.module");
var tunein_module_1 = require("../tunein/tunein.module");
var userstream_module_1 = require("../userstream/userstream.module");
var audio_controller_1 = require("./audio.controller");
var audio_service_1 = require("./audio.service");
var mixer_service_1 = require("./mixer.service");
var preset_service_1 = require("./preset.service");
var tts_service_1 = require("./tts.service");
var user_stream_service_1 = require("./user-stream.service");
var websockets_controller_1 = require("./websockets.controller");
var AudioModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                data_module_1.DataModule,
                auth_module_1.AuthModule,
                core_module_1.CoreModule,
                spotify_module_1.SpotifyModule,
                tunein_module_1.TuneinModule,
                mpv_module_1.MpvModule,
                userstream_module_1.UserstreamModule,
            ],
            providers: [audio_service_1.AudioService, preset_service_1.PresetService, user_stream_service_1.UserStreamService, mixer_service_1.MixerService, tts_service_1.TtsService],
            controllers: [audio_controller_1.AudioController, websockets_controller_1.WebsocketsController],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AudioModule = _classThis = /** @class */ (function () {
        function AudioModule_1() {
        }
        return AudioModule_1;
    }());
    __setFunctionName(_classThis, "AudioModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AudioModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AudioModule = _classThis;
}();
exports.AudioModule = AudioModule;
