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
exports.MixerService = void 0;
var common_1 = require("@nestjs/common");
var index_1 = require("@views/index");
var cp = require("child_process");
var MixerService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MixerService = _classThis = /** @class */ (function () {
        function MixerService_1() {
            this.logger = new common_1.Logger(MixerService.name, { timestamp: true });
        }
        MixerService_1.prototype.getMixer = function (device) {
            return __awaiter(this, void 0, void 0, function () {
                var equal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contents(device)];
                        case 1:
                            equal = _a.sent();
                            return [2 /*return*/, equal];
                    }
                });
            });
        };
        MixerService_1.prototype.updateMixer = function (device, mixer) {
            return __awaiter(this, void 0, void 0, function () {
                var i, f;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < mixer.frequencies.length)) return [3 /*break*/, 4];
                            f = mixer.frequencies[i];
                            return [4 /*yield*/, this.cset(device, f.numid, f.channels)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        MixerService_1.prototype.resetMixer = function (device, level) {
            return __awaiter(this, void 0, void 0, function () {
                var mixer, i, f;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getMixer(device)];
                        case 1:
                            mixer = _a.sent();
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < mixer.frequencies.length)) return [3 /*break*/, 5];
                            f = mixer.frequencies[i];
                            f.channels.forEach(function (ch) {
                                ch.value = level;
                            });
                            return [4 /*yield*/, this.cset(device, f.numid, f.channels)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [4 /*yield*/, this.getMixer(device)];
                        case 6: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MixerService_1.prototype.cset = function (device, numid, values) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.amixer([
                                '-D',
                                device,
                                'cset',
                                "numid=".concat(numid),
                                "".concat(values
                                    .map(function (a) {
                                    return a.value;
                                })
                                    .join(',')),
                            ])];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MixerService_1.prototype.contents = function (device) {
            return __awaiter(this, void 0, void 0, function () {
                var ch, res, contents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.amixer(['-D', device, 'scontents'])];
                        case 1:
                            ch = _a.sent();
                            return [4 /*yield*/, this.amixer(['-D', device, 'contents'])];
                        case 2:
                            res = _a.sent();
                            return [4 /*yield*/, this.parseContents(res, ch)];
                        case 3:
                            contents = _a.sent();
                            contents.device = device;
                            return [2 /*return*/, contents];
                    }
                });
            });
        };
        MixerService_1.prototype.amixer = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var stdout = '';
                            var stderr = '';
                            var amixer = cp.spawn('/usr/bin/amixer', params);
                            amixer.stdout.on('data', function (data) {
                                stdout += data.toString();
                            });
                            amixer.stderr.on('data', function (data) {
                                stderr += data.toString();
                            });
                            amixer.on('close', function (code) {
                                if (code === 0) {
                                    resolve(stdout);
                                }
                                else {
                                    reject(new Error(stderr));
                                }
                            });
                        })];
                });
            });
        };
        MixerService_1.prototype.parseContents = function (data, controls) {
            return __awaiter(this, void 0, void 0, function () {
                var m, channels, lines, i, _loop_1;
                var _a;
                return __generator(this, function (_b) {
                    m = new index_1.Mixer();
                    channels = controls
                        .split('\n')
                        .map(function (a) {
                        return a.trim();
                    })
                        .filter(function (a) {
                        return a.startsWith('Playback channels:');
                    })
                        .map(function (a) { return a.slice(18).split('-'); })[0];
                    lines = data
                        .split('\n')
                        .filter(function (n) { return n && n.trim() != ''; })
                        .map(function (n) {
                        var v = n.trim();
                        if (v.startsWith('; ') || v.startsWith(': ')) {
                            v = v.slice(2);
                        }
                        return v;
                    });
                    i = 0;
                    _loop_1 = function () {
                        if (lines[i].startsWith('num')) {
                            var obj_1 = {};
                            var fields = "".concat(lines[i], ",").concat(lines[i + 1].replaceAll('values', 'channels'), ",").concat(lines[i + 2].replaceAll(',', '_'))
                                .replaceAll("'", '')
                                .split(',');
                            fields.map(function (a) {
                                var b = a.split('=');
                                if (b[0] == 'values') {
                                    b[1] = b[1].replace('_', ',');
                                }
                                obj_1[b[0]] = b[1];
                                return b;
                            });
                            var f = new index_1.Frequency();
                            f.numid = parseInt(obj_1['numid']);
                            f.min = parseInt(obj_1['min']);
                            f.max = parseInt(obj_1['max']);
                            f.steps = parseInt(obj_1['step']);
                            f.name = (_a = obj_1['name']) !== null && _a !== void 0 ? _a : '';
                            f.title = f.name.slice(f.name.indexOf(' ')).replaceAll(' Playback Volume', '').trim();
                            f.channels = obj_1['values'].split(',').map(function (v, index) {
                                return { name: channels[index].trim(), value: parseInt(v) };
                            });
                            f.value = f.channels[0].value;
                            m.frequencies.push(f);
                            i = i + 2;
                        }
                        i = i + 1;
                    };
                    while (i < lines.length) {
                        _loop_1();
                    }
                    return [2 /*return*/, m];
                });
            });
        };
        return MixerService_1;
    }());
    __setFunctionName(_classThis, "MixerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MixerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MixerService = _classThis;
}();
exports.MixerService = MixerService;
