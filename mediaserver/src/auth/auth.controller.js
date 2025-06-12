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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var decorators_1 = require("./decorators");
var AuthController = function () {
    var _classDecorators = [(0, decorators_1.Public)(), (0, common_1.Controller)('/api/auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getAuthorisationUrl_decorators;
    var _authoriseResponsePost_decorators;
    var _authoriseResponse_decorators;
    var _tokenRefresh_decorators;
    var _getProfile_decorators;
    var _getMyProfile_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService, settingService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.settingService = settingService;
        }
        AuthController_1.prototype.getAuthorisationUrl = function (redirectUrl, state, res) {
            return __awaiter(this, void 0, void 0, function () {
                var authUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.getAuthorisationUrl(state !== null && state !== void 0 ? state : '', redirectUrl)];
                        case 1:
                            authUrl = _a.sent();
                            res.status(302).redirect(authUrl.url);
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.authoriseResponsePost = function (data, res) {
            return __awaiter(this, void 0, void 0, function () {
                var token, targeturl;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.authService.getAccessToken(data.code, (_a = data.state) !== null && _a !== void 0 ? _a : '', (_b = data.grant_type) !== null && _b !== void 0 ? _b : 'authorization_code', data.redirect_uri)];
                        case 1:
                            token = _c.sent();
                            targeturl = '/';
                            return [2 /*return*/, res.status(200).send(token)];
                    }
                });
            });
        };
        AuthController_1.prototype.authoriseResponse = function (code, state, redirectUrl, res) {
            return __awaiter(this, void 0, void 0, function () {
                var token, targeturl, html;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.getAccessToken(code, state, 'authorization_code', redirectUrl)];
                        case 1:
                            token = _a.sent();
                            targeturl = '/';
                            res.header('Content-Type', 'text/html');
                            html = '<html><head><title>PiStereo2</title></head><body><script type="text/javascript">' +
                                'sessionStorage.setItem("auth", JSON.stringify({ tokens: {access: "' +
                                token.access_token +
                                '", refresh: "' +
                                token.refresh_token +
                                '", userid: "' +
                                token.user.id +
                                '", name:"' +
                                token.user.name +
                                '", imageUrl:"' +
                                token.user.imageUrl +
                                '", country: "' +
                                token.user.country +
                                '" }}));' +
                                'window.location.href="' +
                                targeturl +
                                '";' +
                                '</script></body></html>';
                            res.status(200).send(html);
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.tokenRefresh = function (user, token, data) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.getRefreshToken(token, data.refresh_token)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthController_1.prototype.getProfile = function (token, user) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.getProfile(token, user)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthController_1.prototype.getMyProfile = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.getProfile(token)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAuthorisationUrl_decorators = [(0, swagger_1.ApiExcludeEndpoint)(), (0, common_1.Get)('authorise')];
        _authoriseResponsePost_decorators = [(0, swagger_1.ApiExcludeEndpoint)(), (0, common_1.Post)('response')];
        _authoriseResponse_decorators = [(0, swagger_1.ApiExcludeEndpoint)(), (0, common_1.Get)('response')];
        _tokenRefresh_decorators = [(0, swagger_1.ApiExcludeEndpoint)(), (0, common_1.Post)('refresh'), (0, decorators_1.Private)()];
        _getProfile_decorators = [(0, swagger_1.ApiOAuth2)(['user-read-private', 'user-read-email'], 'Api'), (0, common_1.Get)('user/:user'), (0, decorators_1.Private)()];
        _getMyProfile_decorators = [(0, swagger_1.ApiOAuth2)(['user-read-private', 'user-read-email'], 'Api'), (0, common_1.Get)('user'), (0, decorators_1.Private)()];
        __esDecorate(_classThis, null, _getAuthorisationUrl_decorators, { kind: "method", name: "getAuthorisationUrl", static: false, private: false, access: { has: function (obj) { return "getAuthorisationUrl" in obj; }, get: function (obj) { return obj.getAuthorisationUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _authoriseResponsePost_decorators, { kind: "method", name: "authoriseResponsePost", static: false, private: false, access: { has: function (obj) { return "authoriseResponsePost" in obj; }, get: function (obj) { return obj.authoriseResponsePost; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _authoriseResponse_decorators, { kind: "method", name: "authoriseResponse", static: false, private: false, access: { has: function (obj) { return "authoriseResponse" in obj; }, get: function (obj) { return obj.authoriseResponse; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _tokenRefresh_decorators, { kind: "method", name: "tokenRefresh", static: false, private: false, access: { has: function (obj) { return "tokenRefresh" in obj; }, get: function (obj) { return obj.tokenRefresh; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyProfile_decorators, { kind: "method", name: "getMyProfile", static: false, private: false, access: { has: function (obj) { return "getMyProfile" in obj; }, get: function (obj) { return obj.getMyProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
