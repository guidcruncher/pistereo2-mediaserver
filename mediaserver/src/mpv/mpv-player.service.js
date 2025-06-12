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
exports.MpvPlayerService = void 0;
var mpvstatus_mapper_1 = require("@mappers/mpvstatus-mapper");
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var fs = require("fs");
var path = require("path");
var util = require("util");
var execFile = util.promisify(require('node:child_process').execFile);
var errorCodes = {
    success: 200,
    'property not found': 404,
    'property unavailable': 400,
};
var MpvPlayerService = function () {
    var _classDecorators = [(0, common_2.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MpvPlayerService = _classThis = /** @class */ (function () {
        function MpvPlayerService_1(eventEmitter) {
            this.eventEmitter = eventEmitter;
            this.logger = new common_1.Logger(MpvPlayerService.name, { timestamp: true });
        }
        MpvPlayerService_1.prototype.isPlaylist = function () {
            return __awaiter(this, void 0, void 0, function () {
                var playlistCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendCommand('get_property', ['playlist-count'])];
                        case 1:
                            playlistCount = _a.sent();
                            return [2 /*return*/, parseInt(playlistCount.data) > 1];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.getMetaData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var idleProp, metaData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendCommand('get_property', ['core-idle'])];
                        case 1:
                            idleProp = _a.sent();
                            if (!(idleProp && idleProp.statusCode == 200 && !idleProp.data)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.sendCommand('get_property', ['metadata'])];
                        case 2:
                            metaData = _a.sent();
                            if (metaData && metaData.statusCode == 200 && metaData.data) {
                                return [2 /*return*/, metaData.data];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, {}];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.sendCommand = function (cmd_1) {
            return __awaiter(this, arguments, void 0, function (cmd, parameters) {
                var commandText, jsonCmd, socket, cmdArgs;
                var _this = this;
                var _a;
                if (parameters === void 0) { parameters = []; }
                return __generator(this, function (_b) {
                    commandText = [cmd];
                    commandText = commandText.concat(parameters);
                    jsonCmd = JSON.stringify({ command: commandText });
                    socket = (_a = process.env.PISTEREO_MPV_SOCKET) !== null && _a !== void 0 ? _a : path.join(process.cwd(), '../pistereo-config/mpv/socket');
                    cmdArgs = ['-c', "echo '".concat(jsonCmd, "' | socat - ").concat(socket)];
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            try {
                                if (cmd == 'get_property' && parameters.length > 0) {
                                    if (parameters[0] == '') {
                                        reject();
                                        return;
                                    }
                                }
                                _this.logger.verbose("sendCommand: ".concat(cmdArgs.join(' ')));
                                execFile('sh', cmdArgs)
                                    .then(function (result) {
                                    var _a, _b;
                                    try {
                                        var json = JSON.parse(result.stdout);
                                        if (json.error) {
                                            if (json.error != 'success') {
                                                _this.logger.warn('sendCommand Error ', json);
                                                json.statusCode = (_a = errorCodes[json.error]) !== null && _a !== void 0 ? _a : 500;
                                                json.command = jsonCmd;
                                                resolve(json);
                                            }
                                            else {
                                                json.statusCode = (_b = errorCodes[json.error]) !== null && _b !== void 0 ? _b : 500;
                                                json.command = jsonCmd;
                                                resolve(json);
                                            }
                                        }
                                        else {
                                            resolve(json);
                                        }
                                    }
                                    catch (err) {
                                        _this.logger.warn('sendCommand Error ', err);
                                        resolve({
                                            statusCode: 500,
                                            command: jsonCmd,
                                        });
                                    }
                                })
                                    .catch(function (err) {
                                    resolve({ statusCode: 500, command: jsonCmd });
                                    //reject(err)
                                });
                            }
                            catch (err) {
                                reject(err);
                            }
                        })];
                });
            });
        };
        MpvPlayerService_1.prototype.getStatus = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, pathProp, volProp, metaData, playbackProp, idleProp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {
                                playing: false,
                                active: false,
                                url: '',
                                volume: 0,
                                position: 0.0,
                            };
                            return [4 /*yield*/, this.sendCommand('get_property', ['path'])];
                        case 1:
                            pathProp = _a.sent();
                            return [4 /*yield*/, this.sendCommand('get_property', ['volume'])];
                        case 2:
                            volProp = _a.sent();
                            return [4 /*yield*/, this.sendCommand('get_property', ['metadata'])];
                        case 3:
                            metaData = _a.sent();
                            return [4 /*yield*/, this.sendCommand('get_property', ['playback-time'])];
                        case 4:
                            playbackProp = _a.sent();
                            return [4 /*yield*/, this.sendCommand('get_property', ['core-idle'])];
                        case 5:
                            idleProp = _a.sent();
                            if (playbackProp && playbackProp.statusCode == 200) {
                                result.position = playbackProp.data;
                            }
                            if (metaData && metaData.statusCode == 200) {
                                result.metadata = metaData.data;
                            }
                            if (idleProp && idleProp.statusCode == 200) {
                                result.playing = !idleProp.data;
                            }
                            if (pathProp && pathProp.statusCode == 200) {
                                result.active = true;
                                result.url = pathProp.data;
                            }
                            if (volProp && volProp.statusCode == 200) {
                                result.volume = volProp.data;
                            }
                            return [2 /*return*/, (0, mpvstatus_mapper_1.MpvStatusMapper)(result)];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.setVolume = function (level) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendCommand('set_property', ['volume', "".concat(level)])];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.getVolume = function () {
            return __awaiter(this, void 0, void 0, function () {
                var volProp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendCommand('get_property', ['volume'])];
                        case 1:
                            volProp = _a.sent();
                            if (volProp && volProp.statusCode == 200) {
                                return [2 /*return*/, volProp.data];
                            }
                            return [2 /*return*/, 0];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.stop = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.eventEmitter.emit('player', { type: 'paused', playing: false });
                            return [4 /*yield*/, this.sendCommand('stop', [])];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.restartPlayback = function () {
            return __awaiter(this, void 0, void 0, function () {
                var prop, playing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendCommand('set_property', ['pause', false])];
                        case 1:
                            prop = _a.sent();
                            if (!prop) {
                                return [2 /*return*/, false];
                            }
                            playing = !prop.data;
                            if (!playing) {
                                this.eventEmitter.emit('player', { type: 'paused', playing: false });
                            }
                            else {
                                this.eventEmitter.emit('player', { type: 'playing', playing: true });
                            }
                            return [2 /*return*/, !prop.data];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.togglePlayback = function () {
            return __awaiter(this, void 0, void 0, function () {
                var prop, playing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendCommand('cycle', ['pause'])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.sendCommand('get_property', ['pause'])];
                        case 2:
                            prop = _a.sent();
                            if (!prop) {
                                return [2 /*return*/, false];
                            }
                            playing = !prop.data;
                            if (!playing) {
                                this.eventEmitter.emit('player', { type: 'paused', playing: false });
                            }
                            else {
                                this.eventEmitter.emit('player', { type: 'playing', playing: true });
                            }
                            return [2 /*return*/, !prop.data];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.play = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var state;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getStatus()];
                        case 1:
                            state = _a.sent();
                            return [4 /*yield*/, this.sendCommand('loadfile', [url, 'replace'])];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.getCurrentPlayingUrl = function () {
            return __awaiter(this, void 0, void 0, function () {
                var idleProp, pathProp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendCommand('get_property', ['core-idle'])];
                        case 1:
                            idleProp = _a.sent();
                            if (!(idleProp && idleProp.statusCode == 200)) return [3 /*break*/, 3];
                            if (!!idleProp.data) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.sendCommand('get_property', ['path'])];
                        case 2:
                            pathProp = _a.sent();
                            if (pathProp && pathProp.statusCode == 200) {
                                return [2 /*return*/, pathProp.data];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, ''];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.playFanfare = function (resumePreviousTrackAtEnd) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.playFiles(['FranzSchubert-DieForelle.mp3'], resumePreviousTrackAtEnd)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.playFiles = function (files, resumePreviousTrackAtEnd) {
            return __awaiter(this, void 0, void 0, function () {
                var urls;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            urls = files;
                            return [4 /*yield*/, this.playlist(urls, resumePreviousTrackAtEnd)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MpvPlayerService_1.prototype.playlist = function (urls, resumePreviousTrackAtEnd) {
            return __awaiter(this, void 0, void 0, function () {
                var playListFile, currentPlayingUrl, m3u;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            playListFile = path.join(process.env.PISTEREO_CACHE, 'temp.m3u');
                            return [4 /*yield*/, this.getCurrentPlayingUrl()];
                        case 1:
                            currentPlayingUrl = _a.sent();
                            if (fs.existsSync(playListFile)) {
                                fs.unlinkSync(playListFile);
                            }
                            m3u = [];
                            m3u.push('#EXTM3U');
                            urls.forEach(function (url) {
                                if (url.startsWith('http://') || url.startsWith('https://'))
                                    m3u.push(url);
                                else {
                                    m3u.push(path.join('/streams/', url));
                                }
                            });
                            if (resumePreviousTrackAtEnd && currentPlayingUrl != '') {
                                m3u.push(currentPlayingUrl);
                            }
                            if (fs.existsSync(playListFile)) {
                                fs.unlinkSync(playListFile);
                            }
                            fs.writeFileSync(playListFile, m3u.join('\n'), 'utf8');
                            return [4 /*yield*/, this.play(playListFile)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.restartPlayback()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MpvPlayerService_1;
    }());
    __setFunctionName(_classThis, "MpvPlayerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MpvPlayerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MpvPlayerService = _classThis;
}();
exports.MpvPlayerService = MpvPlayerService;
