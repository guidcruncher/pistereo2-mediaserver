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
exports.SpotifyModule = void 0;
var common_1 = require("@nestjs/common");
var auth_module_1 = require("../auth/auth.module");
var core_module_1 = require("../core/core.module");
var data_module_1 = require("../data/data.module");
var metadata_module_1 = require("../metadata/metadata.module");
var mpv_module_1 = require("../mpv/mpv.module");
var librespot_client_service_1 = require("./librespot-client.service");
var librespot_player_service_1 = require("./librespot-player.service");
var list_controller_1 = require("./list.controller");
var player_controller_1 = require("./player.controller");
var playlist_import_service_1 = require("./playlist-import.service");
var spotify_list_service_1 = require("./spotify-list.service");
var spotify_player_service_1 = require("./spotify-player.service");
var websockets_controller_1 = require("./websockets.controller");
var SpotifyModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [data_module_1.DataModule, auth_module_1.AuthModule, core_module_1.CoreModule, metadata_module_1.MetadataModule, mpv_module_1.MpvModule],
            controllers: [player_controller_1.PlayerController, list_controller_1.ListController, websockets_controller_1.WebsocketsController],
            providers: [
                spotify_player_service_1.SpotifyPlayerService,
                spotify_list_service_1.SpotifyListService,
                librespot_client_service_1.LibrespotClientService,
                playlist_import_service_1.PlaylistImportService,
                librespot_player_service_1.LibrespotPlayerService,
            ],
            exports: [
                spotify_player_service_1.SpotifyPlayerService,
                spotify_list_service_1.SpotifyListService,
                librespot_client_service_1.LibrespotClientService,
                librespot_player_service_1.LibrespotPlayerService,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SpotifyModule = _classThis = /** @class */ (function () {
        function SpotifyModule_1() {
        }
        return SpotifyModule_1;
    }());
    __setFunctionName(_classThis, "SpotifyModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SpotifyModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SpotifyModule = _classThis;
}();
exports.SpotifyModule = SpotifyModule;
