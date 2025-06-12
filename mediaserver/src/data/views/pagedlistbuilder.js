"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedListBuilder = void 0;
var index_1 = require("./index");
var PagedListBuilder = /** @class */ (function () {
    function PagedListBuilder() {
    }
    PagedListBuilder.fromArray = function (items, offset, limit, mapper) {
        var l = new index_1.PagedList();
        l.paging.offset = parseInt(offset.toString());
        l.paging.limit = parseInt(limit.toString());
        l.paging.total = items.length;
        l.paging.page = 0;
        l.paging.pageCount = Math.ceil(items.length / l.paging.limit);
        l.paging.page = (l.paging.offset == 0 ? 0 : l.paging.offset / l.paging.limit) + 1;
        var end = l.paging.offset + l.paging.limit;
        l.items = [];
        for (var i = offset; i < end; i++) {
            if (items[i]) {
                l.items.push(mapper(items[i]));
            }
        }
        return l;
    };
    PagedListBuilder.fromMappedArray = function (items, offset, limit) {
        var l = new index_1.PagedList();
        l.paging.offset = parseInt(offset.toString());
        l.paging.limit = parseInt(limit.toString());
        l.paging.total = items.length;
        l.paging.page = 0;
        l.paging.pageCount = Math.ceil(items.length / l.paging.limit);
        l.paging.page = (l.paging.offset == 0 ? 0 : l.paging.offset / l.paging.limit) + 1;
        var end = l.paging.offset + l.paging.limit;
        l.items = [];
        for (var i = offset; i < end; i++) {
            if (items[i]) {
                l.items.push(items[i]);
            }
        }
        return l;
    };
    PagedListBuilder.fromPagedObject = function (obj, mapper, itemProp) {
        if (itemProp === void 0) { itemProp = ''; }
        return PagedListBuilder.fromPagedArray(obj.items, obj.offset, obj.limit, obj.total, mapper, itemProp);
    };
    PagedListBuilder.fromPagedArray = function (items, offset, limit, total, mapper, itemProp) {
        if (itemProp === void 0) { itemProp = ''; }
        var l = new index_1.PagedList();
        l.paging = new index_1.Pager();
        l.paging.offset = offset;
        l.paging.limit = limit;
        l.paging.total = total;
        l.paging.page = 0;
        l.paging.pageCount = Math.ceil(total / l.paging.limit);
        l.paging.page = (l.paging.offset == 0 ? 0 : l.paging.offset / l.paging.limit) + 1;
        items.forEach(function (item) {
            if (itemProp && itemProp != '') {
                if (item[itemProp] && item[itemProp].uri) {
                    l.items.push(mapper(item[itemProp]));
                }
            }
            else {
                if (item) {
                    l.items.push(mapper(item));
                }
            }
        });
        return l;
    };
    return PagedListBuilder;
}());
exports.PagedListBuilder = PagedListBuilder;
