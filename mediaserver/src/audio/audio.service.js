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
exports.AudioService = void 0;
var common_1 = require("@nestjs/common");
var index_1 = require("@views/index");
var index_2 = require("@views/index");
var fs = require("fs");
var path = require("path");
var AudioService = function () {
    var _classDecorators = [(0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AudioService = _classThis = /** @class */ (function () {
        function AudioService_1(eventEmitter, mpvPlayer, 
        //    private readonly spotifyPlayer: SpotifyPlayerService,
        spotifyPlayer, tuneinPlayer, userStreamPlayer, authService, historyService, settingService) {
            this.eventEmitter = eventEmitter;
            this.mpvPlayer = mpvPlayer;
            this.spotifyPlayer = spotifyPlayer;
            this.tuneinPlayer = tuneinPlayer;
            this.userStreamPlayer = userStreamPlayer;
            this.authService = authService;
            this.historyService = historyService;
            this.settingService = settingService;
            this.currentTrack = {}; // Uri = new Uri()
        }
        AudioService_1.prototype.ensureDeviceId = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var filename, obj;
                return __generator(this, function (_a) {
                    filename = path.join(process.env.PISTEREO_CONFIG, 'librespot', 'state.json');
                    if (fs.existsSync(filename)) {
                        obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
                        this._deviceId = obj.device_id;
                    }
                    return [2 /*return*/, this._deviceId];
                });
            });
        };
        AudioService_1.prototype.getNowPlaying = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mpvPlayer.getMetaData()];
                        case 1:
                            data = _a.sent();
                            if (Object.keys(data).length > 0) {
                                return [2 /*return*/, data];
                            }
                            return [2 /*return*/, {}];
                    }
                });
            });
        };
        AudioService_1.prototype.startLastPlayed = function (token, user) {
            return __awaiter(this, void 0, void 0, function () {
                var nothingPlaying, status_1, err_1, lastPlayed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nothingPlaying = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.getStatus(user, token)];
                        case 2:
                            status_1 = _a.sent();
                            nothingPlaying = status_1.device ? !status_1.device.playing : false;
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            nothingPlaying = true;
                            return [3 /*break*/, 4];
                        case 4:
                            if (!nothingPlaying) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.historyService.getLastPlayed(user.id)];
                        case 5:
                            lastPlayed = _a.sent();
                            if (!lastPlayed) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.playMedia(user, token, lastPlayed.uri.toString())];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 7: return [2 /*return*/, false];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        AudioService_1.prototype.saveHistory = function (item, token, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(token != '')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.historyService.addLastPlayed(item, user.id)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.historyService.addHistory(item, user.id)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3: return [4 /*yield*/, this.historyService.addLastPlayed(item, '')];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.historyService.addHistory(item, '')];
                        case 5: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioService_1.prototype.determineStatus = function (token, user) {
            return __awaiter(this, void 0, void 0, function () {
                var status, err_2, lastPlayed, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            status = new index_2.PlayerStatus();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.spotifyPlayer.getStatus(token)];
                        case 2:
                            status = _b.sent();
                            if (status.device.active && status.device.playing) {
                                return [2 /*return*/, status];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _b.sent();
                            return [3 /*break*/, 4];
                        case 4: return [4 /*yield*/, this.historyService.getLastPlayed(user.id)];
                        case 5:
                            lastPlayed = _b.sent();
                            if (!lastPlayed) return [3 /*break*/, 10];
                            _a = lastPlayed.uri.source;
                            switch (_a) {
                                case 'tunein': return [3 /*break*/, 6];
                                case 'user': return [3 /*break*/, 8];
                            }
                            return [3 /*break*/, 10];
                        case 6: return [4 /*yield*/, this.tuneinPlayer.getStatus()];
                        case 7:
                            status = _b.sent();
                            if (status.device.active && status.device.playing) {
                                status.track = lastPlayed;
                                return [2 /*return*/, status];
                            }
                            return [3 /*break*/, 10];
                        case 8: return [4 /*yield*/, this.userStreamPlayer.getStatus()];
                        case 9:
                            status = _b.sent();
                            if (status.device.active && status.device.playing) {
                                status.track = lastPlayed;
                                return [2 /*return*/, status];
                            }
                            return [3 /*break*/, 10];
                        case 10: return [2 /*return*/, status];
                    }
                });
            });
        };
        AudioService_1.prototype.currentUri = function () {
            if (this.currentTrack) {
                if (this.currentTrack.uri) {
                    return this.currentTrack.uri;
                }
            }
            return '';
        };
        AudioService_1.prototype.playMedia = function (user, token, uri) {
            return __awaiter(this, void 0, void 0, function () {
                var uriParts, deviceid, track, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            uriParts = index_1.Uri.fromUriString(uri);
                            return [4 /*yield*/, this.ensureDeviceId(token)];
                        case 1:
                            deviceid = _b.sent();
                            return [4 /*yield*/, this.mpvPlayer.stop()];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, this.spotifyPlayer.stop(token, deviceid)];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, this.historyService.clearLastPlayed()];
                        case 4:
                            _b.sent();
                            _a = uriParts.source;
                            switch (_a) {
                                case 'spotify': return [3 /*break*/, 5];
                                case 'tunein': return [3 /*break*/, 7];
                                case 'user': return [3 /*break*/, 10];
                            }
                            return [3 /*break*/, 13];
                        case 5:
                            this.mpvPlayer.stop();
                            return [4 /*yield*/, this.spotifyPlayer.play(token, deviceid, uriParts)];
                        case 6:
                            track = _b.sent();
                            return [3 /*break*/, 14];
                        case 7: return [4 /*yield*/, this.spotifyPlayer.stop(token, deviceid)];
                        case 8:
                            _b.sent();
                            return [4 /*yield*/, this.tuneinPlayer.play(uriParts)];
                        case 9:
                            track = _b.sent();
                            this.eventEmitter.emit('player', { type: 'trackChanged', track: track });
                            return [3 /*break*/, 14];
                        case 10: return [4 /*yield*/, this.spotifyPlayer.stop(token, '')];
                        case 11:
                            _b.sent();
                            return [4 /*yield*/, this.userStreamPlayer.play(token, user, uriParts)];
                        case 12:
                            track = _b.sent();
                            this.eventEmitter.emit('player', { type: 'trackChanged', track: track });
                            return [3 /*break*/, 14];
                        case 13: throw new common_1.HttpException("Unsupported Uri source : ".concat(uriParts.source), 400);
                        case 14:
                            this.currentTrack = track;
                            this.saveHistory(track, token, user);
                            return [2 /*return*/, track];
                    }
                });
            });
        };
        AudioService_1.prototype.changeVolume = function (user, token, volume) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _f.trys.push([0, 3, , 4]);
                            _b = (_a = this.spotifyPlayer).setVolume;
                            _c = [token];
                            return [4 /*yield*/, this.ensureDeviceId(token)];
                        case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_f.sent(), volume]))];
                        case 2:
                            _f.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _d = _f.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            _f.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.mpvPlayer.setVolume(volume)];
                        case 5:
                            _f.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            _e = _f.sent();
                            return [3 /*break*/, 7];
                        case 7: return [4 /*yield*/, this.getVolume(token)];
                        case 8: return [2 /*return*/, _f.sent()];
                    }
                });
            });
        };
        AudioService_1.prototype.getStatus = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                var status, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            status = new index_2.PlayerStatus();
                            return [4 /*yield*/, this.determineStatus(token, user)];
                        case 1:
                            status = _b.sent();
                            _a = status.device;
                            return [4 /*yield*/, this.getVolume(token)];
                        case 2:
                            _a.volume = (_b.sent()).volume;
                            if (status.track) {
                                this.currentTrack = status.track;
                                if (this.currentUri() != '') {
                                    return [2 /*return*/, status];
                                }
                            }
                            return [2 /*return*/, status];
                    }
                });
            });
        };
        AudioService_1.prototype.getTrackDetail = function (token, uri) {
            return __awaiter(this, void 0, void 0, function () {
                var uriParts, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            uriParts = index_1.Uri.fromUriString(uri);
                            _a = uriParts.source;
                            switch (_a) {
                                case 'spotify': return [3 /*break*/, 1];
                                case 'tunein': return [3 /*break*/, 3];
                                case 'user': return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 1: return [4 /*yield*/, this.spotifyPlayer.getMetaData(token, uriParts)];
                        case 2: return [2 /*return*/, _b.sent()];
                        case 3: return [4 /*yield*/, this.tuneinPlayer.getStation(uriParts)];
                        case 4: return [2 /*return*/, _b.sent()];
                        case 5: return [4 /*yield*/, this.userStreamPlayer.getMetaData(uriParts)];
                        case 6: return [2 /*return*/, _b.sent()];
                        case 7: throw new common_1.HttpException("Unsupported Uri source ".concat(uriParts.source), 400);
                    }
                });
            });
        };
        AudioService_1.prototype.getVolume = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 4]);
                            _b = {};
                            return [4 /*yield*/, this.mpvPlayer.getVolume()];
                        case 1: return [2 /*return*/, (_b.volume = _d.sent(), _b)];
                        case 2:
                            _a = _d.sent();
                            _c = {};
                            return [4 /*yield*/, this.spotifyPlayer.getVolume(token)];
                        case 3: return [2 /*return*/, (_c.volume = _d.sent(), _c)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AudioService_1.prototype.togglePlayback = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, status_2, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (this.currentUri() == '') {
                                throw new common_1.HttpException('Nothing playing', 400);
                            }
                            _a = this.currentTrack.uri.source;
                            switch (_a) {
                                case 'spotify': return [3 /*break*/, 1];
                                case 'tunein': return [3 /*break*/, 9];
                                case 'user': return [3 /*break*/, 9];
                            }
                            return [3 /*break*/, 11];
                        case 1: return [4 /*yield*/, this.spotifyPlayer.getStatus(token)];
                        case 2:
                            status_2 = _h.sent();
                            if (!status_2) return [3 /*break*/, 8];
                            if (!status_2.device.playing) return [3 /*break*/, 5];
                            _c = (_b = this.spotifyPlayer).playerCommand;
                            _d = [token];
                            return [4 /*yield*/, this.ensureDeviceId(token)];
                        case 3: return [4 /*yield*/, _c.apply(_b, _d.concat([_h.sent(), 'pause']))];
                        case 4: return [2 /*return*/, _h.sent()];
                        case 5:
                            _f = (_e = this.spotifyPlayer).playerCommand;
                            _g = [token];
                            return [4 /*yield*/, this.ensureDeviceId(token)];
                        case 6: return [4 /*yield*/, _f.apply(_e, _g.concat([_h.sent(), 'play']))];
                        case 7: return [2 /*return*/, _h.sent()];
                        case 8: return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, this.mpvPlayer.togglePlayback()];
                        case 10: return [2 /*return*/, _h.sent()];
                        case 11: throw new common_1.HttpException("Unsupported Uri source ".concat(this.currentTrack.uri.source), 400);
                    }
                });
            });
        };
        AudioService_1.prototype.stopPlayback = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            this.currentTrack = {};
                            _b = (_a = this.spotifyPlayer).playerCommand;
                            _c = [token];
                            return [4 /*yield*/, this.ensureDeviceId(token)];
                        case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent(), 'stop']))];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, this.historyService.clearLastPlayed()];
                        case 3:
                            _d.sent();
                            return [4 /*yield*/, this.mpvPlayer.stop()];
                        case 4: return [2 /*return*/, _d.sent()];
                    }
                });
            });
        };
        AudioService_1.prototype.nextTrack = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                var state, _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.getStatus(user, token)];
                        case 1:
                            state = _e.sent();
                            if (!(state && state.track)) return [3 /*break*/, 6];
                            _a = state.track.uri.source;
                            switch (_a) {
                                case 'spotify': return [3 /*break*/, 2];
                                case 'tunein': return [3 /*break*/, 5];
                                case 'user': return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 6];
                        case 2:
                            _c = (_b = this.spotifyPlayer).playerCommand;
                            _d = [token];
                            return [4 /*yield*/, this.ensureDeviceId(token)];
                        case 3: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent(), 'next']))];
                        case 4: return [2 /*return*/, _e.sent()];
                        case 5: return [2 /*return*/, {}];
                        case 6: throw new common_1.HttpException("Unsupported Uri source ".concat(this.currentTrack.uri.source), 400);
                    }
                });
            });
        };
        AudioService_1.prototype.previousTrack = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (this.currentUri() == '') {
                                throw new common_1.HttpException('Nothing playing', 400);
                            }
                            _a = this.currentTrack.uri.source;
                            switch (_a) {
                                case 'spotify': return [3 /*break*/, 1];
                                case 'tunein': return [3 /*break*/, 4];
                                case 'user': return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 5];
                        case 1:
                            _c = (_b = this.spotifyPlayer).playerCommand;
                            _d = [token];
                            return [4 /*yield*/, this.ensureDeviceId(token)];
                        case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent(), 'previous']))];
                        case 3: return [2 /*return*/, _e.sent()];
                        case 4: return [2 /*return*/, {}];
                        case 5: throw new common_1.HttpException("Unsupported Uri source ".concat(this.currentTrack.uri.source), 400);
                    }
                });
            });
        };
        AudioService_1.prototype.playFanfare = function (resumePreviousTrackAtEnd) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mpvPlayer.playFanfare(resumePreviousTrackAtEnd)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AudioService_1.prototype.playFiles = function (filenames, resumePreviousTrackAtEnd) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.mpvPlayer.playFiles(filenames, resumePreviousTrackAtEnd)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return AudioService_1;
    }());
    __setFunctionName(_classThis, "AudioService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AudioService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AudioService = _classThis;
}();
exports.AudioService = AudioService;
