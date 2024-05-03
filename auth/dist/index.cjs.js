'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var auth = require('firebase/auth');
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

var useAuthState = (function (auth$1, options) {
    var _a = useLoadingValue(function () { return auth$1.currentUser; }), error = _a.error, loading = _a.loading, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    react.useEffect(function () {
        var listener = auth.onAuthStateChanged(auth$1, function (user) { return __awaiter(void 0, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(options === null || options === void 0 ? void 0 : options.onUserChanged)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, options.onUserChanged(user)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        setError(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        setValue(user);
                        return [2 /*return*/];
                }
            });
        }); }, setError);
        return function () {
            listener();
        };
    }, [auth$1]);
    return [value, loading, error];
});

var useCreateUserWithEmailAndPassword = (function (auth$1, options) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(), registeredUser = _b[0], setRegisteredUser = _b[1];
    var _c = react.useState(false), loading = _c[0], setLoading = _c[1];
    var createUserWithEmailAndPassword = react.useCallback(function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, auth.createUserWithEmailAndPassword(auth$1, email, password)];
                case 2:
                    user = _a.sent();
                    if (!(options && options.sendEmailVerification && user.user)) return [3 /*break*/, 4];
                    return [4 /*yield*/, auth.sendEmailVerification(user.user, options.emailVerificationOptions)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    setRegisteredUser(user);
                    return [2 /*return*/, user];
                case 5:
                    error_1 = _a.sent();
                    setError(error_1);
                    return [3 /*break*/, 7];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [auth$1, options]);
    return [createUserWithEmailAndPassword, registeredUser, loading, error];
});

var useDeleteUser = (function (auth) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var deleteUser = react.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    if (!auth.currentUser) return [3 /*break*/, 3];
                    return [4 /*yield*/, auth.currentUser.delete()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3: throw new Error('No user is logged in');
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [2 /*return*/, false];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [auth]);
    return [deleteUser, loading, error];
});

var useSendEmailVerification = (function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var sendEmailVerification = react.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    if (!auth$1.currentUser) return [3 /*break*/, 3];
                    return [4 /*yield*/, auth.sendEmailVerification(auth$1.currentUser)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3: throw new Error('No user is logged in');
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [2 /*return*/, false];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [sendEmailVerification, loading, error];
});

var useSendPasswordResetEmail = (function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var sendPasswordResetEmail = react.useCallback(function (email, actionCodeSettings) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth.sendPasswordResetEmail(auth$1, email, actionCodeSettings)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [2 /*return*/, false];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [sendPasswordResetEmail, loading, error];
});

var useSendSignInLinkToEmail = (function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var sendSignInLinkToEmail = react.useCallback(function (email, actionCodeSettings) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth.sendSignInLinkToEmail(auth$1, email, actionCodeSettings)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [2 /*return*/, false];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [sendSignInLinkToEmail, loading, error];
});

var useSignInWithEmailAndPassword = (function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(), loggedInUser = _b[0], setLoggedInUser = _b[1];
    var _c = react.useState(false), loading = _c[0], setLoading = _c[1];
    var signInWithEmailAndPassword = react.useCallback(function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth.signInWithEmailAndPassword(auth$1, email, password)];
                case 2:
                    user = _a.sent();
                    setLoggedInUser(user);
                    return [2 /*return*/, user];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [signInWithEmailAndPassword, loggedInUser, loading, error];
});

var useSignInWithEmailLink = (function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(), loggedInUser = _b[0], setLoggedInUser = _b[1];
    var _c = react.useState(false), loading = _c[0], setLoading = _c[1];
    var signInWithEmailLink = react.useCallback(function (email, emailLink) { return __awaiter(void 0, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth.signInWithEmailLink(auth$1, email, emailLink)];
                case 2:
                    user = _a.sent();
                    setLoggedInUser(user);
                    return [2 /*return*/, user];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [signInWithEmailLink, loggedInUser, loading, error];
});

var useSignInWithApple = function (auth) {
    return useSignInWithOAuth(auth, 'apple.com');
};
var useSignInWithFacebook = function (auth$1) {
    var createFacebookAuthProvider = react.useCallback(function (scopes, customOAuthParameters) {
        var provider = new auth.FacebookAuthProvider();
        if (scopes) {
            scopes.forEach(function (scope) { return provider.addScope(scope); });
        }
        if (customOAuthParameters) {
            provider.setCustomParameters(customOAuthParameters);
        }
        return provider;
    }, []);
    return useSignInWithPopup(auth$1, createFacebookAuthProvider);
};
var useSignInWithGithub = function (auth$1) {
    var createGithubAuthProvider = react.useCallback(function (scopes, customOAuthParameters) {
        var provider = new auth.GithubAuthProvider();
        if (scopes) {
            scopes.forEach(function (scope) { return provider.addScope(scope); });
        }
        if (customOAuthParameters) {
            provider.setCustomParameters(customOAuthParameters);
        }
        return provider;
    }, []);
    return useSignInWithPopup(auth$1, createGithubAuthProvider);
};
var useSignInWithGoogle = function (auth$1) {
    var createGoogleAuthProvider = react.useCallback(function (scopes, customOAuthParameters) {
        var provider = new auth.GoogleAuthProvider();
        if (scopes) {
            scopes.forEach(function (scope) { return provider.addScope(scope); });
        }
        if (customOAuthParameters) {
            provider.setCustomParameters(customOAuthParameters);
        }
        return provider;
    }, []);
    return useSignInWithPopup(auth$1, createGoogleAuthProvider);
};
var useSignInWithMicrosoft = function (auth) {
    return useSignInWithOAuth(auth, 'microsoft.com');
};
var useSignInWithTwitter = function (auth$1) {
    var createTwitterAuthProvider = react.useCallback(function (scopes, customOAuthParameters) {
        var provider = new auth.TwitterAuthProvider();
        if (scopes) {
            scopes.forEach(function (scope) { return provider.addScope(scope); });
        }
        if (customOAuthParameters) {
            provider.setCustomParameters(customOAuthParameters);
        }
        return provider;
    }, []);
    return useSignInWithPopup(auth$1, createTwitterAuthProvider);
};
var useSignInWithYahoo = function (auth) {
    return useSignInWithOAuth(auth, 'yahoo.com');
};
var useSignInWithOAuth = function (auth$1, providerId) {
    var createOAuthProvider = react.useCallback(function (scopes, customOAuthParameters) {
        var provider = new auth.OAuthProvider(providerId);
        if (scopes) {
            scopes.forEach(function (scope) { return provider.addScope(scope); });
        }
        if (customOAuthParameters) {
            provider.setCustomParameters(customOAuthParameters);
        }
        return provider;
    }, [providerId]);
    return useSignInWithPopup(auth$1, createOAuthProvider);
};
var useSignInWithPopup = function (auth$1, createProvider) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(), loggedInUser = _b[0], setLoggedInUser = _b[1];
    var _c = react.useState(false), loading = _c[0], setLoading = _c[1];
    var doSignInWithPopup = react.useCallback(function (scopes, customOAuthParameters) { return __awaiter(void 0, void 0, void 0, function () {
        var provider, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    provider = createProvider(scopes, customOAuthParameters);
                    return [4 /*yield*/, auth.signInWithPopup(auth$1, provider)];
                case 2:
                    user = _a.sent();
                    setLoggedInUser(user);
                    return [2 /*return*/, user];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [auth$1, createProvider]);
    return [doSignInWithPopup, loggedInUser, loading, error];
};

var useSignOut = (function (auth) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var signOut = react.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth.signOut()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [2 /*return*/, false];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [auth]);
    return [signOut, loading, error];
});

var useUpdateEmail = function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var updateEmail = react.useCallback(function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    if (!auth$1.currentUser) return [3 /*break*/, 3];
                    return [4 /*yield*/, auth.updateEmail(auth$1.currentUser, email)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3: throw new Error('No user is logged in');
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [2 /*return*/, false];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [updateEmail, loading, error];
};
var useUpdatePassword = function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var updatePassword = react.useCallback(function (password) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    if (!auth$1.currentUser) return [3 /*break*/, 3];
                    return [4 /*yield*/, auth.updatePassword(auth$1.currentUser, password)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3: throw new Error('No user is logged in');
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_2 = _a.sent();
                    setError(err_2);
                    return [2 /*return*/, false];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [updatePassword, loading, error];
};
var useUpdateProfile = function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var updateProfile = react.useCallback(function (profile) { return __awaiter(void 0, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    if (!auth$1.currentUser) return [3 /*break*/, 3];
                    return [4 /*yield*/, auth.updateProfile(auth$1.currentUser, profile)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3: throw new Error('No user is logged in');
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_3 = _a.sent();
                    setError(err_3);
                    return [2 /*return*/, false];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [updateProfile, loading, error];
};
var useVerifyBeforeUpdateEmail = function (auth$1) {
    var _a = react.useState(), error = _a[0], setError = _a[1];
    var _b = react.useState(false), loading = _b[0], setLoading = _b[1];
    var verifyBeforeUpdateEmail = react.useCallback(function (email, actionCodeSettings) { return __awaiter(void 0, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    if (!auth$1.currentUser) return [3 /*break*/, 3];
                    return [4 /*yield*/, auth.verifyBeforeUpdateEmail(auth$1.currentUser, email, actionCodeSettings)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3: throw new Error('No user is logged in');
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_4 = _a.sent();
                    setError(err_4);
                    return [2 /*return*/, false];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [auth$1]);
    return [verifyBeforeUpdateEmail, loading, error];
};

var useIdToken = (function (auth$1, options) {
    var _a = useLoadingValue(function () { return auth$1.currentUser; }), error = _a.error, loading = _a.loading, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    react.useEffect(function () {
        var listener = auth.onIdTokenChanged(auth$1, function (user) { return __awaiter(void 0, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(options === null || options === void 0 ? void 0 : options.onUserChanged)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, options.onUserChanged(user)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        setError(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        setValue(user);
                        return [2 /*return*/];
                }
            });
        }); }, setError);
        return function () {
            listener();
        };
    }, [auth$1]);
    return [value, loading, error];
});

exports.useAuthState = useAuthState;
exports.useCreateUserWithEmailAndPassword = useCreateUserWithEmailAndPassword;
exports.useDeleteUser = useDeleteUser;
exports.useIdToken = useIdToken;
exports.useSendEmailVerification = useSendEmailVerification;
exports.useSendPasswordResetEmail = useSendPasswordResetEmail;
exports.useSendSignInLinkToEmail = useSendSignInLinkToEmail;
exports.useSignInWithApple = useSignInWithApple;
exports.useSignInWithEmailAndPassword = useSignInWithEmailAndPassword;
exports.useSignInWithEmailLink = useSignInWithEmailLink;
exports.useSignInWithFacebook = useSignInWithFacebook;
exports.useSignInWithGithub = useSignInWithGithub;
exports.useSignInWithGoogle = useSignInWithGoogle;
exports.useSignInWithMicrosoft = useSignInWithMicrosoft;
exports.useSignInWithTwitter = useSignInWithTwitter;
exports.useSignInWithYahoo = useSignInWithYahoo;
exports.useSignOut = useSignOut;
exports.useUpdateEmail = useUpdateEmail;
exports.useUpdatePassword = useUpdatePassword;
exports.useUpdateProfile = useUpdateProfile;
exports.useVerifyBeforeUpdateEmail = useVerifyBeforeUpdateEmail;
