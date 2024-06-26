import { onValue, onChildChanged, onChildMoved, onChildRemoved, off, onChildAdded } from 'firebase/database';
import { useMemo, useReducer, useCallback, useRef, useEffect } from 'react';

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

var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
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
            return __assign$1(__assign$1({}, state), { error: action.error, loading: false, value: undefined });
        case 'reset':
            return defaultState(action.defaultValue);
        case 'value':
            return __assign$1(__assign$1({}, state), { error: undefined, loading: false, value: action.value });
        default:
            return state;
    }
}; };
var useLoadingValue = (function (getDefaultValue) {
    var defaultValue = getDefaultValue ? getDefaultValue() : undefined;
    var _a = useReducer(reducer(), defaultState(defaultValue)), state = _a[0], dispatch = _a[1];
    var reset = useCallback(function () {
        var defaultValue = getDefaultValue ? getDefaultValue() : undefined;
        dispatch({ type: 'reset', defaultValue: defaultValue });
    }, [getDefaultValue]);
    var setError = useCallback(function (error) {
        dispatch({ type: 'error', error: error });
    }, []);
    var setValue = useCallback(function (value) {
        dispatch({ type: 'value', value: value });
    }, []);
    return useMemo(function () { return ({
        error: state.error,
        loading: state.loading,
        reset: reset,
        setError: setError,
        setValue: setValue,
        value: state.value,
    }); }, [state.error, state.loading, reset, setError, setValue, state.value]);
});

var useComparatorRef = function (value, isEqual, onChange) {
    var ref = useRef(value);
    useEffect(function () {
        if (!isEqual(value, ref.current)) {
            ref.current = value;
            if (onChange) {
                onChange();
            }
        }
    });
    return ref;
};
var isEqual = function (v1, v2) {
    var bothNull = !v1 && !v2;
    var equal = !!v1 && !!v2 && v1.isEqual(v2);
    return bothNull || equal;
};
var useIsEqualRef = function (value, onChange) {
    return useComparatorRef(value, isEqual, onChange);
};

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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var isObject = function (val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
};
var snapshotToData = function (snapshot, keyField, refField, transform) {
    var _a, _b;
    if (!snapshot.exists) {
        return undefined;
    }
    var val = snapshot.val();
    if (isObject(val)) {
        return __assign(__assign(__assign({}, (transform ? transform(val) : val)), (keyField ? (_a = {}, _a[keyField] = snapshot.key, _a) : null)), (refField ? (_b = {}, _b[refField] = snapshot.ref, _b) : null));
    }
    return transform ? transform(val) : val;
};

var initialState = {
    loading: true,
    value: {
        keys: [],
        values: [],
    },
};
var listReducer = function (state, action) {
    switch (action.type) {
        case 'add':
            if (!action.snapshot) {
                return state;
            }
            return __assign(__assign({}, state), { error: undefined, value: addChild(state.value, action.snapshot, action.previousKey) });
        case 'change':
            if (!action.snapshot) {
                return state;
            }
            return __assign(__assign({}, state), { error: undefined, value: changeChild(state.value, action.snapshot) });
        case 'error':
            return __assign(__assign({}, state), { error: action.error, loading: false, value: {
                    keys: undefined,
                    values: undefined,
                } });
        case 'move':
            if (!action.snapshot) {
                return state;
            }
            return __assign(__assign({}, state), { error: undefined, value: moveChild(state.value, action.snapshot, action.previousKey) });
        case 'remove':
            if (!action.snapshot) {
                return state;
            }
            return __assign(__assign({}, state), { error: undefined, value: removeChild(state.value, action.snapshot) });
        case 'reset':
            return initialState;
        case 'value':
            return __assign(__assign({}, state), { error: undefined, loading: false, value: setValue(action.snapshots) });
        case 'empty':
            return __assign(__assign({}, state), { loading: false, value: {
                    keys: undefined,
                    values: undefined,
                } });
        default:
            return state;
    }
};
var setValue = function (snapshots) {
    if (!snapshots) {
        return {
            keys: [],
            values: [],
        };
    }
    var keys = [];
    var values = [];
    snapshots.forEach(function (snapshot) {
        if (!snapshot.key) {
            return;
        }
        keys.push(snapshot.key);
        values.push(snapshot);
    });
    return {
        keys: keys,
        values: values,
    };
};
var addChild = function (currentState, snapshot, previousKey) {
    if (!snapshot.key) {
        return currentState;
    }
    var keys = currentState.keys, values = currentState.values;
    if (!previousKey) {
        // The child has been added to the start of the list
        return {
            keys: keys ? __spreadArray([snapshot.key], keys, true) : [snapshot.key],
            values: values ? __spreadArray([snapshot], values, true) : [snapshot],
        };
    }
    // Establish the index for the previous child in the list
    var index = keys ? keys.indexOf(previousKey) : 0;
    // Insert the item after the previous child
    return {
        keys: keys
            ? __spreadArray(__spreadArray(__spreadArray([], keys.slice(0, index + 1), true), [snapshot.key], false), keys.slice(index + 1), true) : [snapshot.key],
        values: values
            ? __spreadArray(__spreadArray(__spreadArray([], values.slice(0, index + 1), true), [snapshot], false), values.slice(index + 1), true) : [snapshot],
    };
};
var changeChild = function (currentState, snapshot) {
    if (!snapshot.key) {
        return currentState;
    }
    var keys = currentState.keys, values = currentState.values;
    var index = keys ? keys.indexOf(snapshot.key) : 0;
    return __assign(__assign({}, currentState), { values: values
            ? __spreadArray(__spreadArray(__spreadArray([], values.slice(0, index), true), [snapshot], false), values.slice(index + 1), true) : [snapshot] });
};
var removeChild = function (currentState, snapshot) {
    if (!snapshot.key) {
        return currentState;
    }
    var keys = currentState.keys, values = currentState.values;
    var index = keys ? keys.indexOf(snapshot.key) : 0;
    return {
        keys: keys ? __spreadArray(__spreadArray([], keys.slice(0, index), true), keys.slice(index + 1), true) : [],
        values: values
            ? __spreadArray(__spreadArray([], values.slice(0, index), true), values.slice(index + 1), true) : [],
    };
};
var moveChild = function (currentState, snapshot, previousKey) {
    // Remove the child from it's previous location
    var tempValue = removeChild(currentState, snapshot);
    // Add the child into it's new location
    return addChild(tempValue, snapshot, previousKey);
};
var useListReducer = (function () { return useReducer(listReducer, initialState); });

var useList = function (query) {
    var _a = useListReducer(), state = _a[0], dispatch = _a[1];
    var queryRef = useIsEqualRef(query, function () { return dispatch({ type: 'reset' }); });
    var ref = queryRef.current;
    useEffect(function () {
        if (!ref) {
            dispatch({ type: 'empty' });
            return;
        }
        var onChildAdded$1 = function (snapshot, previousKey) {
            dispatch({ type: 'add', previousKey: previousKey, snapshot: snapshot });
        };
        var onChildChanged$1 = function (snapshot) {
            dispatch({ type: 'change', snapshot: snapshot });
        };
        var onChildMoved$1 = function (snapshot, previousKey) {
            dispatch({ type: 'move', previousKey: previousKey, snapshot: snapshot });
        };
        var onChildRemoved$1 = function (snapshot) {
            dispatch({ type: 'remove', snapshot: snapshot });
        };
        var onError = function (error) {
            dispatch({ type: 'error', error: error });
        };
        var onValue$1 = function (snapshots) {
            dispatch({ type: 'value', snapshots: snapshots });
        };
        var childAddedHandler;
        var onInitialLoad = function (snapshot) {
            var snapshotVal = snapshot.val();
            var childrenToProcess = snapshotVal
                ? Object.keys(snapshot.val()).length
                : 0;
            // If the list is empty then initialise the hook and use the default `onChildAdded` behaviour
            if (childrenToProcess === 0) {
                childAddedHandler = onChildAdded(ref, onChildAdded$1, onError);
                onValue$1([]);
            }
            else {
                // Otherwise, we load the first batch of children all to reduce re-renders
                var children_1 = [];
                var onChildAddedWithoutInitialLoad = function (addedChild, previousKey) {
                    if (childrenToProcess > 0) {
                        childrenToProcess--;
                        children_1.push(addedChild);
                        if (childrenToProcess === 0) {
                            onValue$1(children_1);
                        }
                        return;
                    }
                    onChildAdded$1(addedChild, previousKey);
                };
                childAddedHandler = onChildAdded(ref, onChildAddedWithoutInitialLoad, onError);
            }
        };
        onValue(ref, onInitialLoad, onError, { onlyOnce: true });
        var childChangedHandler = onChildChanged(ref, onChildChanged$1, onError);
        var childMovedHandler = onChildMoved(ref, onChildMoved$1, onError);
        var childRemovedHandler = onChildRemoved(ref, onChildRemoved$1, onError);
        return function () {
            off(ref, 'child_added', childAddedHandler);
            off(ref, 'child_changed', childChangedHandler);
            off(ref, 'child_moved', childMovedHandler);
            off(ref, 'child_removed', childRemovedHandler);
        };
    }, [dispatch, ref]);
    return [state.value.values, state.loading, state.error];
};
var useListKeys = function (query) {
    var _a = useList(query), snapshots = _a[0], loading = _a[1], error = _a[2];
    var values = useMemo(function () {
        return snapshots
            ? snapshots.map(function (snapshot) { return snapshot.key; })
            : undefined;
    }, [snapshots]);
    return [values, loading, error];
};
var useListVals = function (query, options) {
    // Breaking this out in both `useList` and `useObject` rather than
    // within the `snapshotToData` prevents the developer needing to ensure
    // that `options` is memoized. If `options` was passed directly then it
    // would cause the values to be recalculated every time the whole
    // `options object changed
    var _a = options !== null && options !== void 0 ? options : {}, keyField = _a.keyField, refField = _a.refField, transform = _a.transform;
    var _b = useList(query), snapshots = _b[0], loading = _b[1], error = _b[2];
    var values = useMemo(function () {
        return (snapshots
            ? snapshots.map(function (snapshot) {
                return snapshotToData(snapshot, keyField, refField, transform);
            })
            : undefined);
    }, [snapshots, keyField, refField, transform]);
    return [values, loading, error];
};

var useObject = function (query) {
    var _a = useLoadingValue(), error = _a.error, loading = _a.loading, reset = _a.reset, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    var ref = useIsEqualRef(query, reset);
    useEffect(function () {
        var query = ref.current;
        if (!query) {
            setValue(undefined);
            return;
        }
        onValue(query, setValue, setError);
        return function () {
            off(query, 'value', setValue);
        };
    }, [ref.current]);
    return [value, loading, error];
};
var useObjectVal = function (query, options) {
    // Breaking this out in both `useList` and `useObject` rather than
    // within the `snapshotToData` prevents the developer needing to ensure
    // that `options` is memoized. If `options` was passed directly then it
    // would cause the values to be recalculated every time the whole
    // `options object changed
    var _a = options !== null && options !== void 0 ? options : {}, keyField = _a.keyField, refField = _a.refField, transform = _a.transform;
    var _b = useObject(query), snapshot = _b[0], loading = _b[1], error = _b[2];
    var value = useMemo(function () {
        return (snapshot
            ? snapshotToData(snapshot, keyField, refField, transform)
            : undefined);
    }, [snapshot, keyField, refField, transform]);
    return [value, loading, error];
};

export { useList, useListKeys, useListVals, useObject, useObjectVal };
