"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var isObject = function (value) {
    return value && typeof value === 'object' && value.constructor === Object;
};
var isString = function (value) {
    return typeof value === 'string' || value instanceof String;
};
var objectForIn = function (object, callback) {
    try {
        Object.keys(object).map(function (item) {
            return callback(item);
        });
    }
    catch (error) { }
};
var parseDateOrInteger = function (string) {
    var date = new Date();
    var withInteger = new Date(date * 1 + string * 864e5);
    return !!parseInt(string) ? withInteger : string;
};
var objectContains = function (object, value) {
    if (!isObject(object))
        return false;
    return (Object.keys(object)
        .filter(function (item) { return item === value; })
        .toString() === value && isString(value));
};
var cache = {};
var storageOperator = function (type, key, value) {
    if (key === void 0) { key = ''; }
    if (value === void 0) { value = ''; }
    return {
        parser: function () {
            return window[type];
        },
        get: function (key) {
            return window[type][key];
        },
        set: function (key, value) {
            window[type][key] = value;
        },
        unset: function (key) {
            window[type].removeItem(key);
        }
    };
};
var operator = {
    localstorage: {
        parser: function () {
            return storageOperator('localStorage').parser();
        },
        get: function (key) {
            return storageOperator('localStorage').get(key);
        },
        set: function (key, value) {
            storageOperator('localStorage').set(key, value);
        },
        unset: function (key) {
            try {
                storageOperator('localStorage').unset(key);
            }
            catch (error) { }
        },
        clear: function () {
            objectForIn(window.localStorage, operator.localstorage.unset);
        }
    },
    sessionstorage: {
        parser: function () {
            return storageOperator('sessionStorage').parser();
        },
        get: function (key) {
            return storageOperator('sessionStorage').get(key);
        },
        set: function (key, value) {
            storageOperator('sessionStorage').set(key, value);
        },
        unset: function (key) {
            try {
                storageOperator('sessionStorage').unset(key);
            }
            catch (error) { }
        },
        clear: function () {
            objectForIn(window.sessionStorage, operator.sessionstorage.unset);
        }
    },
    cookie: {
        parser: function () {
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            if (cookies.length === 0)
                return;
            return cookies.map(function (value) { return value.split('='); }).reduce(function (cookieAccumulator, cookieValue) {
                cookieAccumulator[decodeURIComponent(cookieValue[0])] = decodeURIComponent(cookieValue[1]);
                return cookieAccumulator;
            }, {});
        },
        set: function (key, value, parameters) {
            if (parameters === void 0) { parameters = { path: '', domain: '', expires: '' }; }
            var path = parameters.path || '';
            var domain = parameters.domain || '';
            var expires = parseDateOrInteger(parameters.expires) || '';
            document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path='" + path + "';domain='" + domain + "'";
        },
        get: function (key, expect) {
            return cache[key];
        },
        unset: function (key) {
            document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            cache[key] = undefined;
        },
        clear: function () {
            objectForIn(operator.cookie.parser(), operator.cookie.unset);
            cache = {};
        }
    }
};
function StorageManage(manager) {
    var managers = Object.freeze({
        c: 'cookie',
        l: 'localstorage',
        s: 'sessionstorage',
        cookie: 'cookie',
        localstorage: 'localstorage',
        sessionstorage: 'sessionstorage'
    });
    if (!!Storage) {
        manager = managers[manager.toLowerCase()] || 'cookie';
    }
    else {
        console.warn("Browser doesn't have support to Storage");
        manager = 'cookie';
    }
    return Object.freeze({
        changeManager: changeManager,
        get: get,
        set: set,
        unset: unset,
        clear: clear,
        clearAll: clearAll,
        // Alias for Get
        item: get,
        getItem: get,
        cat: get,
        // Alias for set
        create: set,
        setItem: set,
        touch: set,
        // Alias for unset
        "delete": unset,
        remove: unset,
        rm: unset,
        // Alias for clearAll
        purge: clearAll,
        json: json
    });
    function json() {
        var parser = operator[manager].parser(), json = {};
        Object.keys(parser).map(function (item) {
            try {
                json = __assign({}, json, (_a = {}, _a[item] = JSON.parse(parser[item]), _a));
            }
            catch (error) {
                json = __assign({}, json, (_b = {}, _b[item] = parser[item], _b));
            }
            var _a, _b;
        });
        return json;
    }
    function changeManager(value) {
        if (objectContains(managers, value)) {
            manager = managers[value.toLowerCase().trim()];
        }
        else {
            manager = 'cookie';
        }
        cache = operator[manager].parser();
    }
    function get(key, expect) {
        var value = operator[manager].get(key);
        try {
            return expect === 'raw' || expect === 'r'
                ? value
                : expect === 'array' || expect === 'a' ? value.split(',') : JSON.parse(value);
        }
        catch (error) {
            return value;
        }
    }
    function set(key, value, expires) {
        if (expires === void 0) { expires = ''; }
        operator[manager].set(key, JSON.stringify(value), expires);
        cache = __assign({}, cache, (_a = {}, _a[key] = value, _a));
        var _a;
    }
    function unset(key) {
        operator[manager].unset(key);
    }
    function clear() {
        operator[manager].clear();
    }
    function clearAll() {
        ['cookie', 'localstorage', 'sessionstorage'].forEach(function (x) { return operator[x].clear(); });
    }
}
exports["default"] = StorageManage;
