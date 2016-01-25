'use strict';

(function (angular, buildfire) {
    angular.module('fixedTimerPluginContent')
        .provider('Buildfire', [function () {
            var Buildfire = this;
            Buildfire.$get = function () {
                return buildfire
            };
            return Buildfire;
        }])
        .factory("DataStore", ['Buildfire', '$q', 'STATUS_CODE', 'MESSAGES','STATUS_MESSAGES', function (Buildfire, $q, STATUS_CODE, MESSAGES, STATUS_MESSAGES) {
            return {
                get: function (_tagName) {
                    var deferred = $q.defer();
                    Buildfire.datastore.get(_tagName, function (err, result) {
                        if (err) {
                            return deferred.reject(err);
                        } else if (result) {
                            return deferred.resolve(result);
                        }
                    });
                    return deferred.promise;
                },
                getById: function (_id, _tagName) {
                    var deferred = $q.defer();
                    if (typeof _id == 'undefined') {
                        return deferred.reject(new Error({
                            code: STATUS_CODE.UNDEFINED_ID,
                            message: STATUS_MESSAGES.UNDEFINED_ID
                        }));
                    }
                    Buildfire.datastore.getById(_id, _tagName, function (err, result) {
                        if (err) {
                            return deferred.reject(err);
                        } else if (result) {
                            return deferred.resolve(result);
                        }
                    });
                    return deferred.promise;
                },
                insert: function (_item, _tagName) {
                    var deferred = $q.defer();
                    if (typeof _item == 'undefined') {
                        return deferred.reject(new Error({
                            code: STATUS_CODE.UNDEFINED_DATA,
                            message: STATUS_MESSAGES.UNDEFINED_DATA
                        }));
                    }
                    if (Array.isArray(_item)) {
                        return deferred.reject(new Error({
                            code: STATUS_CODE.ITEM_ARRAY_FOUND,
                            message: STATUS_MESSAGES.ITEM_ARRAY_FOUND
                        }));
                    } else {
                        Buildfire.datastore.insert(_item, _tagName, false, function (err, result) {
                            if (err) {
                                return deferred.reject(err);
                            } else if (result) {
                                return deferred.resolve(result);
                            }
                        });
                    }
                    return deferred.promise;
                },
                update: function (_id, _item, _tagName) {
                    var deferred = $q.defer();
                    if (typeof _id == 'undefined') {
                        return deferred.reject(new Error({
                            code: STATUS_CODE.UNDEFINED_ID,
                            message: STATUS_MESSAGES.UNDEFINED_ID
                        }));
                    }
                    if (typeof _item == 'undefined') {
                        return deferred.reject(new Error({
                            code: STATUS_CODE.UNDEFINED_DATA,
                            message: STATUS_MESSAGES.UNDEFINED_DATA
                        }));
                    }
                    Buildfire.datastore.update(_id, _item, _tagName, function (err, result) {
                        if (err) {
                            return deferred.reject(err);
                        } else if (result) {
                            return deferred.resolve(result);
                        }
                    });
                    return deferred.promise;
                },
                save: function (_item, _tagName) {
                    var deferred = $q.defer();
                    if (typeof _item == 'undefined') {
                        return deferred.reject(new Error({
                            code: STATUS_CODE.UNDEFINED_DATA,
                            message: STATUS_MESSAGES.UNDEFINED_DATA
                        }));
                    }
                    Buildfire.datastore.save(_item, _tagName, function (err, result) {
                        if (err) {
                            return deferred.reject(err);
                        } else if (result) {
                            return deferred.resolve(result);
                        }
                    });
                    return deferred.promise;
                },
                onUpdate: function () {
                    var deferred = $q.defer();
                    var onUpdateFn = Buildfire.datastore.onUpdate(function (data) {
                        if (!data) {
                            return deferred.notify(new Error({
                                code: STATUS_CODE.UNDEFINED_DATA,
                                message: STATUS_MESSAGES.UNDEFINED_DATA
                            }), true);
                        } else {
                            return deferred.notify(data);
                        }
                    });
                    return deferred.promise;
                },
                search: function (options, tagName) {
                    var deferred = $q.defer();
                    if (!tagName) {
                        return deferred.reject(new Error(MESSAGES.ERROR.TAG_NOT_DEFINED));
                    }
                    Buildfire.datastore.search(options, tagName, function (err, result) {
                        if (err) {
                            return deferred.reject(err);
                        }
                        else if (result) {
                            return deferred.resolve(result);
                        } else {
                            return deferred.reject(new Error(MESSAGES.ERROR.NOT_FOUND));
                        }
                    });
                    return deferred.promise;
                },
                delete: function (id, tagName) {
                    var deferred = $q.defer();
                    if (typeof id == 'undefined') {
                        return deferred.reject(new Error(MESSAGES.ERROR.ID_NOT_DEFINED));
                    }
                    Buildfire.datastore.delete(id, tagName, function (err, result) {
                        if (err) {
                            return deferred.reject(err);
                        }
                        else if (result) {
                            return deferred.resolve(result);
                        } else {
                            return deferred.reject(new Error(MESSAGES.ERROR.NOT_FOUND));
                        }
                    });
                    return deferred.promise;
                }
            }
        }])
        .factory('Location', [function () {
            var _location = window.location;
            return {
                goTo: function (path) {
                    _location.href = path;
                },
                goToHome: function () {
                    _location.href = _location.href.substr(0, _location.href.indexOf('#'));
                }
            };
        }])
        .factory('RankOfLastItem', [function () {
            var _rankOfLastItem;
            return {
                getRank: function () {
                    return (_rankOfLastItem || 0);
                },
                setRank: function (value) {
                    _rankOfLastItem = value;
                }
            };
        }])
})(window.angular, window.buildfire);