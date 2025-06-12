"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyPlayerService = void 0;
var event_base_service_1 = require("@core/event-base.service");
var http_transport_service_1 = require("@core/http-transport.service");
var index_1 = require("@mappers/index");
var common_1 = require("@nestjs/common");
var index_2 = require("@views/index");
(0, common_1.Injectable)();
var SpotifyPlayerService = /** @class */ (function (_super) {
    __extends(SpotifyPlayerService, _super);
    function SpotifyPlayerService(librespotClient) {
        var _this = _super.call(this) || this;
        _this.librespotClient = librespotClient;
        _this.transport = new http_transport_service_1.HttpTransportService();
        return _this;
    }
    SpotifyPlayerService.prototype.getQueryString = function (device_id, parameters) {
        var _a;
        var params = new URLSearchParams();
        params.append('device_id', device_id);
        if (parameters) {
            for (var key in parameters) {
                params.append(key, ((_a = parameters[key]) !== null && _a !== void 0 ? _a : '').toString());
            }
        }
        return "?".concat(params.toString());
    };
    SpotifyPlayerService.prototype.currentPlaying = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var trs, result, track;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trs = new http_transport_service_1.HttpTransportService();
                        return [4 /*yield*/, trs.request('GET', 'https://api.spotify.com/v1/me/player/currently-playing', {
                                Authorization: "Bearer ".concat(token),
                            })];
                    case 1:
                        result = _a.sent();
                        track = {};
                        if (result.status == 204) {
                            return [2 /*return*/, track];
                        }
                        return [2 /*return*/, (0, index_1.PlayableItemMapper)(result.value)];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.getStatus = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var trs, result, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trs = new http_transport_service_1.HttpTransportService();
                        return [4 /*yield*/, trs.request('GET', 'https://api.spotify.com/v1/me/player', {
                                Authorization: "Bearer ".concat(token),
                            })];
                    case 1:
                        result = _a.sent();
                        state = new index_2.PlayerStatus();
                        if (result.status == 204) {
                            return [2 /*return*/, state];
                        }
                        state = (0, index_1.SpotifyStatusMapper)(result.value);
                        return [2 /*return*/, state];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.getMetaData = function (token, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (uri.source != 'spotify') {
                            throw new common_1.HttpException("Bad uri source, got ".concat(uri.source, ", expected spotify"), 400);
                        }
                        url = '';
                        5;
                        switch (uri.type) {
                            case 'album':
                                url = 'https://api.spotify.com/v1/albums/' + uri.id;
                                break;
                            case 'playlist':
                                url = 'https://api.spotify.com/v1/playlists/' + uri.id;
                                break;
                            case 'artist':
                                url = 'https://api.spotify.com/v1/artists/' + uri.id;
                                break;
                            case 'show':
                                url = 'https://api.spotify.com/v1/shows/' + uri.id;
                                break;
                            case 'track':
                                url = 'https://api.spotify.com/v1/tracks/' + uri.id;
                                break;
                            case 'episode':
                                url = 'https://api.spotify.com/v1/episodes/' + uri.id;
                                break;
                        }
                        return [4 /*yield*/, this.transport.request('GET', url, { Authorization: "Bearer ".concat(token) })];
                    case 1:
                        result = _a.sent();
                        if (uri.type == 'playlist') {
                            return [2 /*return*/, (0, index_1.PlayableItemMapper)(result.value.tracks.items[0].track)];
                        }
                        return [2 /*return*/, (0, index_1.PlayableItemMapper)(result.value)];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.play = function (token, device_id, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var request, result, status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (uri.source != 'spotify') {
                            throw new common_1.HttpException("Bad uri source, got ".concat(uri.source, ", expected spotify"), 400);
                        }
                        request = {};
                        switch (uri.type) {
                            case 'album':
                            case 'playlist':
                            case 'artist':
                            case 'show':
                                request = { context_uri: uri.toString(), position_ms: 0 };
                                break;
                            case 'track':
                            case 'episode':
                                request = { uris: [uri.toString()], position_ms: 0 };
                                break;
                        }
                        return [4 /*yield*/, this.transport.request('PUT', 'https://api.spotify.com/v1/me/player/play' + this.getQueryString(device_id), { Authorization: "Bearer ".concat(token) }, request)];
                    case 1:
                        result = _a.sent();
                        if (!(result.status == 204)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getMetaData(token, uri)];
                    case 2:
                        status_1 = _a.sent();
                        if (status_1) {
                            return [2 /*return*/, status_1];
                        }
                        _a.label = 3;
                    case 3: throw new common_1.HttpException('Playback error', result.status);
                }
            });
        });
    };
    SpotifyPlayerService.prototype.stop = function (token, device_id) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.transport.request('PUT', 'https://api.spotify.com/v1/me/player/pause' + this.getQueryString(device_id), { Authorization: "Bearer ".concat(token) }, {})];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.playerCommand = function (token, device_id, command) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, status_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = undefined;
                        _a = command;
                        switch (_a) {
                            case 'play': return [3 /*break*/, 1];
                            case 'resume': return [3 /*break*/, 1];
                            case 'previous': return [3 /*break*/, 3];
                            case 'next': return [3 /*break*/, 5];
                            case 'stop': return [3 /*break*/, 7];
                            case 'pause': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, this.transport.request('PUT', 'https://api.spotify.com/v1/me/player/play' + this.getQueryString(device_id), { Authorization: "Bearer ".concat(token) }, {})];
                    case 2:
                        result = _b.sent();
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, this.transport.request('POST', 'https://api.spotify.com/v1/me/player/previous' + this.getQueryString(device_id), { Authorization: "Bearer ".concat(token) }, {})];
                    case 4:
                        result = _b.sent();
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, this.transport.request('POST', 'https://api.spotify.com/v1/me/player/next' + this.getQueryString(device_id), { Authorization: "Bearer ".concat(token) }, {})];
                    case 6:
                        result = _b.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.stop(token, device_id)];
                    case 8:
                        result = _b.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        if (!result) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.getStatus(token)];
                    case 10:
                        status_2 = _b.sent();
                        if (status_2) {
                            return [2 /*return*/, status_2.track];
                        }
                        _b.label = 11;
                    case 11: throw new common_1.HttpException('Invalid Player command', 400);
                }
            });
        });
    };
    SpotifyPlayerService.prototype.getVolume = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatus(token)];
                    case 1:
                        status = _a.sent();
                        if (status) {
                            if (status.device) {
                                return [2 /*return*/, status.device.volume];
                            }
                        }
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.setVolume = function (token, device_id, value) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport.request('PUT', 'https://api.spotify.com/v1/me/player/volume' +
                            this.getQueryString(device_id, { volume_percent: value }), { Authorization: "Bearer ".concat(token) }, {})];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.getPlaybackQueue = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport.request('GET', 'https://api.spotify.com/v1/me/player/queue', { Authorization: "Bearer ".concat(token) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, (0, index_1.PlaybackQueueMapper)(result.value)];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.addToQueue = function (token, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport.request('POST', 'http://127.0.0.1:3678/player/add_to_queue', { 'Content-Type': 'application/json' }, { uri: uri.toString() })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.getDevices = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport.request('GET', 'https://api.spotify.com/v1/me/player/devices', { Authorization: "Bearer ".concat(token) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.value.devices
                                .map(function (a) {
                                return { id: a.id, name: a.name, active: a.is_active };
                            })
                                .sort(function (a, b) {
                                return a.name.localeCompare(b.name);
                            })];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.getDeviceId = function (token, name) {
        return __awaiter(this, void 0, void 0, function () {
            var result, device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDevices(token)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            device = result.find(function (device) {
                                return device.name == name;
                            });
                            if (device) {
                                return [2 /*return*/, device];
                            }
                            throw new common_1.HttpException("Device not found ".concat(name), 404);
                        }
                        throw new common_1.HttpException("No Devices found ".concat(name), 404);
                }
            });
        });
    };
    SpotifyPlayerService.prototype.disconnect = function (token, deviceid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.playerCommand(token, deviceid, 'stop')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.connect = function (token, name) {
        return __awaiter(this, void 0, void 0, function () {
            var device, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDeviceId(token, name)];
                    case 1:
                        device = _a.sent();
                        return [4 /*yield*/, this.transport.request('PUT', 'https://api.spotify.com/v1/me/player', { 'Content-Type': 'application/json', Authorization: "Bearer ".concat(token) }, { device_ids: [device.id], play: true })];
                    case 2:
                        result = _a.sent();
                        this.emit('streamer.disconnect', {});
                        return [2 /*return*/, device];
                }
            });
        });
    };
    SpotifyPlayerService.prototype.search = function (token, user, type, q, offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = new URLSearchParams();
                        params.append('q', q);
                        params.append('market', user.country);
                        params.append('type', type.toLowerCase());
                        params.append('offset', offset.toString());
                        params.append('limit', limit.toString());
                        return [4 /*yield*/, this.transport.request('GET', "https://api.spotify.com/v1/search?".concat(params.toString()), { Authorization: "Bearer ".concat(token) })];
                    case 1:
                        result = _a.sent();
                        key = type.toLowerCase() + 's';
                        if (!result.value[key]) {
                            throw new common_1.HttpException("Property \"".concat(key, "\" missing on results"), 500);
                        }
                        return [2 /*return*/, index_2.PagedListBuilder.fromPagedObject(result.value[key], index_1.PlayableItemMapper)];
                }
            });
        });
    };
    return SpotifyPlayerService;
}(event_base_service_1.EventBaseService));
exports.SpotifyPlayerService = SpotifyPlayerService;
