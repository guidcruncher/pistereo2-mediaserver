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
exports.PlayerController = void 0;
var decorators_1 = require("@auth/decorators");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var uri_1 = require("@views/uri");
var PlayerController = function () {
    var _classDecorators = [(0, swagger_1.ApiExcludeController)(), (0, swagger_1.ApiOAuth2)(['user-read-playback-state', 'user-modify-playback-state', 'user-read-recently-played'], 'Api'), (0, decorators_1.Private)(), (0, common_1.Controller)('/api/spotify/player')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getStatus_decorators;
    var _play_decorators;
    var _setVolume_decorators;
    var _playerCommand_decorators;
    var _getDevices_decorators;
    var _getPlaybackQueue_decorators;
    var _connect_decorators;
    var _disconnect_decorators;
    var PlayerController = _classThis = /** @class */ (function () {
        function PlayerController_1(
        //   private readonly playerService: SpotifyPlayerService
        playerService) {
            this.playerService = (__runInitializers(this, _instanceExtraInitializers), playerService);
        }
        PlayerController_1.prototype.getStatus = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.playerService.getStatus(token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PlayerController_1.prototype.play = function (user, token, deviceid, uri) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.playerService.play(token, deviceid, uri_1.Uri.fromUriString(uri))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PlayerController_1.prototype.setVolume = function (user, token, deviceid, volume) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (volume < 0 || volume > 100) {
                                throw new common_1.HttpException('Volume outside permitted range', 400);
                            }
                            return [4 /*yield*/, this.playerService.setVolume(token, deviceid, volume)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PlayerController_1.prototype.playerCommand = function (user, token, deviceid, command) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!['play', 'resume', 'previous', 'next', 'stop', 'pause'].includes(command)) {
                                throw new common_1.HttpException("Invalid command ".concat(command), 400);
                            }
                            return [4 /*yield*/, this.playerService.playerCommand(token, deviceid, command)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PlayerController_1.prototype.getDevices = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.playerService.getDevices(token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PlayerController_1.prototype.getPlaybackQueue = function (user, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.playerService.getPlaybackQueue(token)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PlayerController_1.prototype.connect = function (user, token, device) {
            return __awaiter(this, void 0, void 0, function () {
                var name;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = '';
                            switch (device) {
                                case 'local':
                                    name = process.env.PISTEREO_LOCALDEVICE;
                                    break;
                                case 'remote':
                                    name = process.env.PISTEREO_REMOTEDEVICE;
                                    break;
                                default:
                                    throw new common_1.HttpException('Invalid device type', 400);
                            }
                            return [4 /*yield*/, this.playerService.connect(token, name)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PlayerController_1.prototype.disconnect = function (user, token, deviceid) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.playerService.disconnect(token, deviceid)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return PlayerController_1;
    }());
    __setFunctionName(_classThis, "PlayerController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getStatus_decorators = [(0, common_1.Get)('status')];
        _play_decorators = [(0, common_1.Put)(':deviceid/play')];
        _setVolume_decorators = [(0, common_1.Put)(':deviceid/control/volume')];
        _playerCommand_decorators = [(0, common_1.Put)(':deviceid/control/:command')];
        _getDevices_decorators = [(0, common_1.Get)('devices')];
        _getPlaybackQueue_decorators = [(0, common_1.Get)('queue')];
        _connect_decorators = [(0, common_1.Put)()];
        _disconnect_decorators = [(0, common_1.Delete)(':deviceid')];
        __esDecorate(_classThis, null, _getStatus_decorators, { kind: "method", name: "getStatus", static: false, private: false, access: { has: function (obj) { return "getStatus" in obj; }, get: function (obj) { return obj.getStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _play_decorators, { kind: "method", name: "play", static: false, private: false, access: { has: function (obj) { return "play" in obj; }, get: function (obj) { return obj.play; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setVolume_decorators, { kind: "method", name: "setVolume", static: false, private: false, access: { has: function (obj) { return "setVolume" in obj; }, get: function (obj) { return obj.setVolume; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _playerCommand_decorators, { kind: "method", name: "playerCommand", static: false, private: false, access: { has: function (obj) { return "playerCommand" in obj; }, get: function (obj) { return obj.playerCommand; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDevices_decorators, { kind: "method", name: "getDevices", static: false, private: false, access: { has: function (obj) { return "getDevices" in obj; }, get: function (obj) { return obj.getDevices; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPlaybackQueue_decorators, { kind: "method", name: "getPlaybackQueue", static: false, private: false, access: { has: function (obj) { return "getPlaybackQueue" in obj; }, get: function (obj) { return obj.getPlaybackQueue; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _connect_decorators, { kind: "method", name: "connect", static: false, private: false, access: { has: function (obj) { return "connect" in obj; }, get: function (obj) { return obj.connect; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _disconnect_decorators, { kind: "method", name: "disconnect", static: false, private: false, access: { has: function (obj) { return "disconnect" in obj; }, get: function (obj) { return obj.disconnect; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlayerController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlayerController = _classThis;
}();
exports.PlayerController = PlayerController;
