'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var firestore = require('firebase/firestore');
var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var defaultState = function (defaultValue) {
    return {
        loading: defaultValue === undefined || defaultValue === null,
        value: defaultValue,
    };
};
var reducer = function () { return function (state, action) {
    switch (action.type) {
        case 'error':
            return __assign(__assign({}, state), { error: action.error, loading: false, value: undefined });
        case 'reset':
            return defaultState(action.defaultValue);
        case 'value':
            return __assign(__assign({}, state), { error: undefined, loading: false, value: action.value });
        default:
            return state;
    }
}; };
var useLoadingValue = (function (getDefaultValue) {
    var defaultValue = getDefaultValue ? getDefaultValue() : undefined;
    var _a = react.useReducer(reducer(), defaultState(defaultValue)), state = _a[0], dispatch = _a[1];
    var reset = react.useCallback(function () {
        var defaultValue = getDefaultValue ? getDefaultValue() : undefined;
        dispatch({ type: 'reset', defaultValue: defaultValue });
    }, [getDefaultValue]);
    var setError = react.useCallback(function (error) {
        dispatch({ type: 'error', error: error });
    }, []);
    var setValue = react.useCallback(function (value) {
        dispatch({ type: 'value', value: value });
    }, []);
    return react.useMemo(function () { return ({
        error: state.error,
        loading: state.loading,
        reset: reset,
        setError: setError,
        setValue: setValue,
        value: state.value,
    }); }, [state.error, state.loading, reset, setError, setValue, state.value]);
});

var useComparatorRef = function (value, isEqual, onChange) {
    var ref = react.useRef(value);
    react.useEffect(function () {
        if (!isEqual(value, ref.current)) {
            ref.current = value;
            if (onChange) {
                onChange();
            }
        }
    });
    return ref;
};

var useIsMounted = (function () {
    var _a = react.useState(true), isMounted = _a[0], setIsMounted = _a[1];
    react.useEffect(function () {
        return function () {
            setIsMounted(false);
        };
    }, []);
    return isMounted;
});

var isRefEqual = function (v1, v2) {
    var bothNull = !v1 && !v2;
    var equal = !!v1 && !!v2 && firestore.refEqual(v1, v2);
    return bothNull || equal;
};
var useIsFirestoreRefEqual = function (value, onChange) {
    return useComparatorRef(value, isRefEqual, onChange);
};
var isQueryEqual = function (v1, v2) {
    var bothNull = !v1 && !v2;
    var equal = !!v1 && !!v2 && firestore.queryEqual(v1, v2);
    return bothNull || equal;
};
var useIsFirestoreQueryEqual = function (value, onChange) {
    return useComparatorRef(value, isQueryEqual, onChange);
};

var useCollection = function (query, options) {
    var _a = useLoadingValue(), error = _a.error, loading = _a.loading, reset = _a.reset, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    var ref = useIsFirestoreQueryEqual(query, reset);
    react.useEffect(function () {
        if (!ref.current) {
            setValue(undefined);
            return;
        }
        var unsubscribe = (options === null || options === void 0 ? void 0 : options.snapshotListenOptions)
            ? firestore.onSnapshot(ref.current, options.snapshotListenOptions, setValue, setError)
            : firestore.onSnapshot(ref.current, setValue, setError);
        return function () {
            unsubscribe();
        };
    }, [ref.current]);
    return [value, loading, error];
};
var useCollectionOnce = function (query, options) {
    var _a = useLoadingValue(), error = _a.error, loading = _a.loading, reset = _a.reset, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    var isMounted = useIsMounted();
    var ref = useIsFirestoreQueryEqual(query, reset);
    var loadData = react.useCallback(function (query, options) { return __awaiter(void 0, void 0, void 0, function () {
        var get, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!query) {
                        setValue(undefined);
                        return [2 /*return*/];
                    }
                    get = getDocsFnFromGetOptions(options === null || options === void 0 ? void 0 : options.getOptions);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, get(query)];
                case 2:
                    result = _a.sent();
                    if (isMounted) {
                        setValue(result);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (isMounted) {
                        setError(error_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    var reloadData = react.useCallback(function () { return loadData(ref.current, options); }, [
        loadData,
        ref.current,
    ]);
    react.useEffect(function () {
        loadData(ref.current, options);
    }, [ref.current]);
    return [value, loading, error, reloadData];
};
var useCollectionData = function (query, options) {
    var _a = useCollection(query, options), snapshots = _a[0], loading = _a[1], error = _a[2];
    var values = getValuesFromSnapshots(snapshots, options === null || options === void 0 ? void 0 : options.snapshotOptions, options === null || options === void 0 ? void 0 : options.initialValue);
    return [values, loading, error, snapshots];
};
var useCollectionDataOnce = function (query, options) {
    var _a = useCollectionOnce(query, options), snapshots = _a[0], loading = _a[1], error = _a[2], reloadData = _a[3];
    var values = getValuesFromSnapshots(snapshots, options === null || options === void 0 ? void 0 : options.snapshotOptions, options === null || options === void 0 ? void 0 : options.initialValue);
    return [values, loading, error, snapshots, reloadData];
};
var getValuesFromSnapshots = function (snapshots, options, initialValue) {
    return react.useMemo(function () {
        var _a;
        return ((_a = snapshots === null || snapshots === void 0 ? void 0 : snapshots.docs.map(function (doc) { return doc.data(options); })) !== null && _a !== void 0 ? _a : initialValue);
    }, [snapshots, options]);
};
var getDocsFnFromGetOptions = function (_a) {
    var _b = _a === void 0 ? { source: 'default' } : _a, source = _b.source;
    switch (source) {
        default:
        case 'default':
            return firestore.getDocs;
        case 'cache':
            return firestore.getDocsFromCache;
        case 'server':
            return firestore.getDocsFromServer;
    }
};

var useDocument = function (docRef, options) {
    var _a = useLoadingValue(), error = _a.error, loading = _a.loading, reset = _a.reset, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    var ref = useIsFirestoreRefEqual(docRef, reset);
    react.useEffect(function () {
        if (!ref.current) {
            setValue(undefined);
            return;
        }
        var unsubscribe = (options === null || options === void 0 ? void 0 : options.snapshotListenOptions)
            ? firestore.onSnapshot(ref.current, options.snapshotListenOptions, setValue, setError)
            : firestore.onSnapshot(ref.current, setValue, setError);
        return function () {
            unsubscribe();
        };
    }, [ref.current]);
    return [value, loading, error];
};
var useDocumentOnce = function (docRef, options) {
    var _a = useLoadingValue(), error = _a.error, loading = _a.loading, reset = _a.reset, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    var isMounted = useIsMounted();
    var ref = useIsFirestoreRefEqual(docRef, reset);
    var loadData = react.useCallback(function (reference, options) { return __awaiter(void 0, void 0, void 0, function () {
        var get, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!reference) {
                        setValue(undefined);
                        return [2 /*return*/];
                    }
                    get = getDocFnFromGetOptions(options === null || options === void 0 ? void 0 : options.getOptions);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, get(reference)];
                case 2:
                    result = _a.sent();
                    if (isMounted) {
                        setValue(result);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (isMounted) {
                        setError(error_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    var reloadData = react.useCallback(function () { return loadData(ref.current, options); }, [
        loadData,
        ref.current,
    ]);
    react.useEffect(function () {
        if (!ref.current) {
            setValue(undefined);
            return;
        }
        loadData(ref.current, options);
    }, [ref.current]);
    return [value, loading, error, reloadData];
};
var useDocumentData = function (docRef, options) {
    var _a = useDocument(docRef, options), snapshot = _a[0], loading = _a[1], error = _a[2];
    var value = getValueFromSnapshot(snapshot, options === null || options === void 0 ? void 0 : options.snapshotOptions, options === null || options === void 0 ? void 0 : options.initialValue);
    return [value, loading, error, snapshot];
};
var useDocumentDataOnce = function (docRef, options) {
    var _a = useDocumentOnce(docRef, options), snapshot = _a[0], loading = _a[1], error = _a[2], reloadData = _a[3];
    var value = getValueFromSnapshot(snapshot, options === null || options === void 0 ? void 0 : options.snapshotOptions, options === null || options === void 0 ? void 0 : options.initialValue);
    return [value, loading, error, snapshot, reloadData];
};
var getDocFnFromGetOptions = function (_a) {
    var _b = _a === void 0 ? { source: 'default' } : _a, source = _b.source;
    switch (source) {
        default:
        case 'default':
            return firestore.getDoc;
        case 'cache':
            return firestore.getDocFromCache;
        case 'server':
            return firestore.getDocFromServer;
    }
};
var getValueFromSnapshot = function (snapshot, options, initialValue) {
    return react.useMemo(function () { var _a; return ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.data(options)) !== null && _a !== void 0 ? _a : initialValue); }, [snapshot, options, initialValue]);
};

exports.useCollection = useCollection;
exports.useCollectionData = useCollectionData;
exports.useCollectionDataOnce = useCollectionDataOnce;
exports.useCollectionOnce = useCollectionOnce;
exports.useDocument = useDocument;
exports.useDocumentData = useDocumentData;
exports.useDocumentDataOnce = useDocumentDataOnce;
exports.useDocumentOnce = useDocumentOnce;
