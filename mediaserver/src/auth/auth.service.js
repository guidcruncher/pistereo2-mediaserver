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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var index_1 = require("@mappers/index");
var common_1 = require("@nestjs/common");
var crypto = require("crypto");
var util = require("util");
var scopes_1 = require("./scopes");
var execFile = util.promisify(require('node:child_process').execFile);
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(userService) {
            this.userService = userService;
        }
        AuthService_1.prototype.getRedirectUrl = function (url) {
            if (url && url != '') {
                return url;
            }
            return "".concat(process.env.PISTEREO_BASEURL, "/api/auth/response");
        };
        AuthService_1.prototype.getProfile = function (token_1) {
            return __awaiter(this, arguments, void 0, function (token, user) {
                var url, result, json;
                if (user === void 0) { user = ''; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = 'https://api.spotify.com/v1/me';
                            if (user) {
                                url = "https://api.spotify.com/v1/users/".concat(user);
                            }
                            return [4 /*yield*/, fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        Authorization: 'Bearer ' + token,
                                    },
                                })];
                        case 1:
                            result = _a.sent();
                            return [4 /*yield*/, result.json()];
                        case 2:
                            json = _a.sent();
                            return [2 /*return*/, (0, index_1.ProfileMapper)(json)];
                    }
                });
            });
        };
        AuthService_1.prototype.getAuthorisationUrl = function (state, redirectUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var verifier, params, result;
                return __generator(this, function (_a) {
                    verifier = state == '' ? this.generateCodeVerifier(128) : state;
                    params = new URLSearchParams();
                    params.append('client_id', process.env.PISTEREO_CLIENTID);
                    params.append('response_type', 'code');
                    params.append('redirect_uri', this.getRedirectUrl(redirectUrl));
                    params.append('scope', scopes_1.scopes.join(' '));
                    params.append('state', verifier);
                    result = {
                        url: "https://accounts.spotify.com/authorize?".concat(params.toString()),
                        state: verifier,
                    };
                    return [2 /*return*/, result];
                });
            });
        };
        AuthService_1.prototype.getAccessToken = function (code_1, verifier_1) {
            return __awaiter(this, arguments, void 0, function (code, verifier, grantType, redirectUrl) {
                var params, result, body, user;
                if (grantType === void 0) { grantType = 'authorization_code'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = new URLSearchParams();
                            params.append('grant_type', grantType);
                            params.append('code', code);
                            params.append('redirect_uri', this.getRedirectUrl(redirectUrl));
                            params.append('code_verifier', verifier);
                            return [4 /*yield*/, fetch('https://accounts.spotify.com/api/token', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        Authorization: 'Basic ' +
                                            Buffer.from(process.env.PISTEREO_CLIENTID +
                                                ':' +
                                                process.env.PISTEREO_CLIENTSECRET).toString('base64'),
                                    },
                                    body: params,
                                })];
                        case 1:
                            result = _a.sent();
                            return [4 /*yield*/, result.json()];
                        case 2:
                            body = _a.sent();
                            if (!body) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.getProfile(body.access_token)];
                        case 3:
                            user = _a.sent();
                            return [4 /*yield*/, this.userService.addSession(body.access_token, body.refresh_token, user, body.expires)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.userService.addUser(user)];
                        case 5:
                            _a.sent();
                            body.user = user ? user : {};
                            _a.label = 6;
                        case 6: return [2 /*return*/, body];
                    }
                });
            });
        };
        AuthService_1.prototype.getRefreshToken = function (accessToken, refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var url, payload, body, response, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = 'https://accounts.spotify.com/api/token';
                            payload = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    Authorization: 'Bearer ' + accessToken,
                                },
                                body: new URLSearchParams({
                                    grant_type: 'refresh_token',
                                    refresh_token: refreshToken,
                                    client_id: process.env.PISTEREO_CLIENTID,
                                }),
                            };
                            return [4 /*yield*/, fetch(url, payload)];
                        case 1:
                            body = _a.sent();
                            return [4 /*yield*/, body.json()];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, this.getProfile(response.access_token)];
                        case 3:
                            user = _a.sent();
                            return [4 /*yield*/, this.userService.addSession(response.access_token, response.refresh_token, user, response.expires)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.userService.addUser(user)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        AuthService_1.prototype.generateCodeVerifier = function (length) {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        AuthService_1.prototype.generateCodeChallenge = function (codeVerifier) {
            return __awaiter(this, void 0, void 0, function () {
                var data, digest;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = new TextEncoder().encode(codeVerifier);
                            return [4 /*yield*/, crypto.subtle.digest('SHA-256', data)];
                        case 1:
                            digest = _a.sent();
                            return [2 /*return*/, btoa(String.fromCharCode.apply(null, __spreadArray([], new Uint8Array(digest), true)))
                                    .replace(/\+/g, '-')
                                    .replace(/\//g, '_')
                                    .replace(/=+$/, '')];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
