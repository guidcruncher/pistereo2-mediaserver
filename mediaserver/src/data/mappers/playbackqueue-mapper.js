"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackQueueMapper = void 0;
var index_1 = require("../views/index");
var playableitem_mapper_1 = require("./playableitem-mapper");
var PlaybackQueueMapper = function (value) {
    var result = new index_1.PlaybackQueue();
    if (value.currently_playing) {
        result.current = (0, playableitem_mapper_1.PlayableItemMapper)(value.currently_playing);
    }
    result.queue = [];
    value.queue.forEach(function (item) {
        result.queue.push((0, playableitem_mapper_1.PlayableItemMapper)(item));
    });
    return result;
};
exports.PlaybackQueueMapper = PlaybackQueueMapper;
