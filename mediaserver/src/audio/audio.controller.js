"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioController = void 0;
var decorators_1 = require("@auth/decorators");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var index_1 = require("@views/index");
var AudioController = function () {
    var _classDecorators = [(0, swagger_1.ApiOAuth2)(['user-read-playback-state', 'user-modify-playback-state', 'user-read-recently-played'], 'Api'), (0, decorators_1.Private)(), (0, common_1.Controller)('/api')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _proxy_decorators;
    var _restoreSettings_decorators;
    var _getPresets_decorators;
    var _getPlaybackQueue_decorators;
    var _getNowPlaying_decorators;
    var _addPresets_decorators;
    var _startLastPlayed_decorators;
    var _playMedia_decorators;
    var _playFile_decorators;
    var _playFiles_decorators;
    var _changeVolume_decorators;
    var _getStatus_decorators;
    var _getVolume_decorators;
    var _togglePlayback_decorators;
    var _stopPlayback_decorators;
    var _nextTrack_decorators;
    var _previousTrack_decorators;
    var _getTrackDetail_decorators;
    var _getMixer_decorators;
    var _resetMixer_decorators;
    var _updateMixer_decorators;
    var _updateMixerChannel_decorators;
    var _getFanfare_decorators;
    var _textToSpeech_decorators;
    var AudioController = _classThis = /** @class */ (function () {
        function AudioController_1(audioService, presetService, spotifyPlayerService, mixerService, settingService, ttsService) {
            this.audioService = (__runInitializers(this, _instanceExtraInitializers), audioService);
            this.presetService = presetService;
            this.spotifyPlayerService = spotifyPlayerService;
            this.mixerService = mixerService;
            this.settingService = settingService;
            this.ttsService = ttsService;
        }
        AudioController_1.prototype.proxy = function (url, res) {
            return __awaiter(this, void 0, void 0, function () {
                var data, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, fetch(url)];
                        case 1:
                            data = _c.sent();
                            res.header('Content-Type', data.headers.get('Content-Type'));
                            _b = (_a = res).send;
                            return [4 /*yield*/, data.bytes()];
                        case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    }
                });
            });
        };
        AudioController_1.prototype.restoreSettings = function (token, user, device) {
            return __awaiter(this, void 0, void 0, function () {
                var setting;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.settingService.getSetting(user.id)];
                        case 1:
                            setting = _b.sent();
                            if (!setting) {
                                throw new common_1.HttpException('No settings available', 404);
                            }
                            return [4 /*yield*/, this.audioService.changeVolume(user, token, (_a = setting.volume) !== null && _a !== void 0 ? _a : 50)];
                        case 2:
                            _b.sent();
                            if (!setting.mixer) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.mixerService.updateMixer(device, setting.mixer)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [2 /*return*/, {}];
                    }
                });
            });
        };
        AudioController_1.prototype.getPresets = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.presetService.getPresets(token, user)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.getPlaybackQueue = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.spotifyPlayerService.getPlaybackQueue(token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.getNowPlaying = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.getNowPlaying()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.addPresets = function (user, token, uri) {
            return __awaiter(this, void 0, void 0, function () {
                var metadata;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.getTrackDetail(token, uri)];
                        case 1:
                            metadata = _a.sent();
                            metadata.uri = index_1.Uri.fromUriString(uri);
                            return [4 /*yield*/, this.presetService.addPreset(token, user, metadata)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.startLastPlayed = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.startLastPlayed(token, user)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.playMedia = function (user, token, uri) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.playMedia(user, token, uri)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.playFile = function (user_1, token_1, filename_1) {
            return __awaiter(this, arguments, void 0, function (user, token, filename, resume) {
                if (resume === void 0) { resume = true; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.playFiles([filename], resume)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.playFiles = function (user_1, token_1, data_1) {
            return __awaiter(this, arguments, void 0, function (user, token, data, resume) {
                if (resume === void 0) { resume = true; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.playFiles(data.filenames, resume)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.changeVolume = function (user, token, volume) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.settingService.updateVolume(user.id, volume)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.audioService.changeVolume(user, token, volume)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.getStatus = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.getStatus(user, token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.getVolume = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.getVolume(token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.togglePlayback = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.togglePlayback(user, token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.stopPlayback = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.stopPlayback(user, token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.nextTrack = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.nextTrack(user, token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.previousTrack = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.previousTrack(user, token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.getTrackDetail = function (token, uri) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.getTrackDetail(token, uri)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.getMixer = function (token, device) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mixerService.getMixer(device)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.resetMixer = function (token, user, device) {
            return __awaiter(this, void 0, void 0, function () {
                var mixer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mixerService.resetMixer(device, parseInt(process.env.PISTEREO_EQ_RESET))];
                        case 1:
                            mixer = _a.sent();
                            return [4 /*yield*/, this.settingService.updateMixer(user.id, mixer)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, mixer];
                    }
                });
            });
        };
        AudioController_1.prototype.updateMixer = function (token, user, device, mixer) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.settingService.updateMixer(user.id, mixer)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.mixerService.updateMixer(device, mixer)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.updateMixerChannel = function (token, user, device, index, item) {
            return __awaiter(this, void 0, void 0, function () {
                var mixer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mixerService.getMixer(device)];
                        case 1:
                            mixer = _a.sent();
                            mixer[index] = item;
                            return [4 /*yield*/, this.settingService.updateMixer(user.id, mixer)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.mixerService.updateMixer(device, mixer)];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.getFanfare = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.audioService.playFanfare(true)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioController_1.prototype.textToSpeech = function (token, user, data, language) {
            return __awaiter(this, void 0, void 0, function () {
                var text;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            text = ((_a = data.text) !== null && _a !== void 0 ? _a : '').trim();
                            if (text == '') {
                                throw new common_1.HttpException('No text specified', 400);
                            }
                            return [4 /*yield*/, this.ttsService.say(text, language, false)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return AudioController_1;
    }());
    __setFunctionName(_classThis, "AudioController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _proxy_decorators = [(0, swagger_1.ApiExcludeEndpoint)(), (0, decorators_1.Public)(), (0, common_1.Get)('/p')];
        _restoreSettings_decorators = [(0, common_1.Get)('/restore/:device')];
        _getPresets_decorators = [(0, common_1.Get)('/presets')];
        _getPlaybackQueue_decorators = [(0, common_1.Get)('/queue')];
        _getNowPlaying_decorators = [(0, common_1.Get)('/nowplaying')];
        _addPresets_decorators = [(0, common_1.Put)('/presets')];
        _startLastPlayed_decorators = [(0, common_1.Put)('/lastplayed')];
        _playMedia_decorators = [(0, common_1.Put)('/play')];
        _playFile_decorators = [(0, common_1.Put)('/playfile')];
        _playFiles_decorators = [(0, common_1.Put)('/playfiles')];
        _changeVolume_decorators = [(0, common_1.Put)('/volume')];
        _getStatus_decorators = [(0, common_1.Get)()];
        _getVolume_decorators = [(0, common_1.Get)('/volume')];
        _togglePlayback_decorators = [(0, common_1.Put)('/toggleplayback')];
        _stopPlayback_decorators = [(0, common_1.Put)('/stop')];
        _nextTrack_decorators = [(0, common_1.Put)('/next')];
        _previousTrack_decorators = [(0, common_1.Put)('/previous')];
        _getTrackDetail_decorators = [(0, common_1.Get)('/metadata/track')];
        _getMixer_decorators = [(0, common_1.Get)('/mixer/:device')];
        _resetMixer_decorators = [(0, common_1.Post)('/mixer/:device/reset')];
        _updateMixer_decorators = [(0, common_1.Post)('/mixer/:device')];
        _updateMixerChannel_decorators = [(0, common_1.Post)('/mixer/:device/channel/:index')];
        _getFanfare_decorators = [(0, common_1.Get)('/fanfare')];
        _textToSpeech_decorators = [(0, common_1.Post)('/tts/:language'), (0, swagger_1.ApiBody)({ type: Object })];
        __esDecorate(_classThis, null, _proxy_decorators, { kind: "method", name: "proxy", static: false, private: false, access: { has: function (obj) { return "proxy" in obj; }, get: function (obj) { return obj.proxy; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _restoreSettings_decorators, { kind: "method", name: "restoreSettings", static: false, private: false, access: { has: function (obj) { return "restoreSettings" in obj; }, get: function (obj) { return obj.restoreSettings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPresets_decorators, { kind: "method", name: "getPresets", static: false, private: false, access: { has: function (obj) { return "getPresets" in obj; }, get: function (obj) { return obj.getPresets; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPlaybackQueue_decorators, { kind: "method", name: "getPlaybackQueue", static: false, private: false, access: { has: function (obj) { return "getPlaybackQueue" in obj; }, get: function (obj) { return obj.getPlaybackQueue; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getNowPlaying_decorators, { kind: "method", name: "getNowPlaying", static: false, private: false, access: { has: function (obj) { return "getNowPlaying" in obj; }, get: function (obj) { return obj.getNowPlaying; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addPresets_decorators, { kind: "method", name: "addPresets", static: false, private: false, access: { has: function (obj) { return "addPresets" in obj; }, get: function (obj) { return obj.addPresets; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _startLastPlayed_decorators, { kind: "method", name: "startLastPlayed", static: false, private: false, access: { has: function (obj) { return "startLastPlayed" in obj; }, get: function (obj) { return obj.startLastPlayed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _playMedia_decorators, { kind: "method", name: "playMedia", static: false, private: false, access: { has: function (obj) { return "playMedia" in obj; }, get: function (obj) { return obj.playMedia; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _playFile_decorators, { kind: "method", name: "playFile", static: false, private: false, access: { has: function (obj) { return "playFile" in obj; }, get: function (obj) { return obj.playFile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _playFiles_decorators, { kind: "method", name: "playFiles", static: false, private: false, access: { has: function (obj) { return "playFiles" in obj; }, get: function (obj) { return obj.playFiles; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _changeVolume_decorators, { kind: "method", name: "changeVolume", static: false, private: false, access: { has: function (obj) { return "changeVolume" in obj; }, get: function (obj) { return obj.changeVolume; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStatus_decorators, { kind: "method", name: "getStatus", static: false, private: false, access: { has: function (obj) { return "getStatus" in obj; }, get: function (obj) { return obj.getStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getVolume_decorators, { kind: "method", name: "getVolume", static: false, private: false, access: { has: function (obj) { return "getVolume" in obj; }, get: function (obj) { return obj.getVolume; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _togglePlayback_decorators, { kind: "method", name: "togglePlayback", static: false, private: false, access: { has: function (obj) { return "togglePlayback" in obj; }, get: function (obj) { return obj.togglePlayback; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _stopPlayback_decorators, { kind: "method", name: "stopPlayback", static: false, private: false, access: { has: function (obj) { return "stopPlayback" in obj; }, get: function (obj) { return obj.stopPlayback; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _nextTrack_decorators, { kind: "method", name: "nextTrack", static: false, private: false, access: { has: function (obj) { return "nextTrack" in obj; }, get: function (obj) { return obj.nextTrack; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _previousTrack_decorators, { kind: "method", name: "previousTrack", static: false, private: false, access: { has: function (obj) { return "previousTrack" in obj; }, get: function (obj) { return obj.previousTrack; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTrackDetail_decorators, { kind: "method", name: "getTrackDetail", static: false, private: false, access: { has: function (obj) { return "getTrackDetail" in obj; }, get: function (obj) { return obj.getTrackDetail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMixer_decorators, { kind: "method", name: "getMixer", static: false, private: false, access: { has: function (obj) { return "getMixer" in obj; }, get: function (obj) { return obj.getMixer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetMixer_decorators, { kind: "method", name: "resetMixer", static: false, private: false, access: { has: function (obj) { return "resetMixer" in obj; }, get: function (obj) { return obj.resetMixer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMixer_decorators, { kind: "method", name: "updateMixer", static: false, private: false, access: { has: function (obj) { return "updateMixer" in obj; }, get: function (obj) { return obj.updateMixer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMixerChannel_decorators, { kind: "method", name: "updateMixerChannel", static: false, private: false, access: { has: function (obj) { return "updateMixerChannel" in obj; }, get: function (obj) { return obj.updateMixerChannel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFanfare_decorators, { kind: "method", name: "getFanfare", static: false, private: false, access: { has: function (obj) { return "getFanfare" in obj; }, get: function (obj) { return obj.getFanfare; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _textToSpeech_decorators, { kind: "method", name: "textToSpeech", static: false, private: false, access: { has: function (obj) { return "textToSpeech" in obj; }, get: function (obj) { return obj.textToSpeech; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AudioController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AudioController = _classThis;
}();
exports.AudioController = AudioController;
