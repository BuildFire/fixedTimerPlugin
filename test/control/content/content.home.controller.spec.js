describe('Unit : fixedTimerPlugin content.home.controller.js', function () {
    var $scope, ContentHome, $rootScope, q, $controller, Buildfire, TAG_NAMES, $timeout;
    beforeEach(module('fixedTimerPluginContent'));



    describe('Unit : DataStore Factory', function () {
        var DataStore, Buildfire, $rootScope, TAG_NAMES, STATUS_MESSAGES, STATUS_CODE, q;
        beforeEach(module('fixedTimerPluginContent', function ($provide) {
            $provide.service('Buildfire', function () {
                this.datastore = jasmine.createSpyObj('datastore', ['get', 'save', 'getById', 'search', 'insert', 'update', 'delete', 'onUpdate']);
                this.datastore.get.and.callFake(function (_tagName, callback) {
                    if (_tagName) {
                        callback(null, 'Success');
                    } else {
                        callback('Error', null);
                    }
                });
                this.datastore.save.and.callFake(function (_item, _tagName, callback) {
                    if (!_item || !typeof callback === 'function') {
                        callback('Error', null);
                    } else {
                        callback(null, 'Success');
                    }
                });
                this.datastore.search.and.callFake(function (options, _tagName, callback) {
                    if (options && _tagName) {
                        callback(null, 'Success');
                    } else {
                        callback('Error', null);
                    }
                });
                this.datastore.delete.and.callFake(function (_id, _tagName, callback) {
                    if (!_id || !typeof callback === 'function') {
                        callback('Error', null);
                    } else {
                        callback(null, 'Success');
                    }
                });
                this.history = {
                    push: function (label, id) {
                    },
                    onPop: function (data) {
                    },
                    pop: function () {

                    }
                };
            });
        }));
        beforeEach(inject(function (_$rootScope_, _DataStore_, _Buildfire_, _TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
            $rootScope = _$rootScope_;
            DataStore = _DataStore_;
            Buildfire = _Buildfire_;
            TAG_NAMES = _TAG_NAMES_;
            STATUS_CODE = _STATUS_CODE_;
            STATUS_MESSAGES = _STATUS_MESSAGES_;
        }));

        beforeEach(function () {

            inject(function ($injector, $q) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                ContentHome = $injector.get('$controller')('ContentHomeCtrl', {
                    $scope: $scope,
                    TAG_NAMES: TAG_NAMES,
                    Buildfire: Buildfire
                });
                q = $q;
            });
        });

        it('Buildfire should exist and be an object', function () {
            expect(typeof Buildfire).toEqual('object');
        });

        it('DataStore should exist and be an object', function () {
            expect(typeof DataStore).toEqual('object');
        });
        it('DataStore.get should exist and be a function', function () {
            expect(typeof DataStore.get).toEqual('function');
        });
        it('DataStore.save should exist and be a function', function () {
            expect(typeof DataStore.save).toEqual('function');
        });
        it('DataStore.search should exist and be a function', function () {
            expect(typeof DataStore.search).toEqual('function');
        });
        it('DataStore.delete should exist and be a function', function () {
            expect(typeof DataStore.delete).toEqual('function');
        });

        describe('init calling', function () {
            it('DataStore.get should return error', function () {
                var result = ''
                    , success = function (response) {
                        result = response;
                    }
                    , error = function (err) {
                        result = err;
                    };
                DataStore.get(null).then(success, error);
                $rootScope.$digest();
                expect(result).toEqual('Error');
            });
            it('DataStore.get should return success', function () {
                var result = ''
                    , success = function (response) {
                        result = response;
                    }
                    , error = function (err) {
                        result = err;
                    };
                DataStore.get(TAG_NAMES.TIMER_INFO).then(success, error);
                $rootScope.$digest();
                expect(result).toEqual('Success');
            });

            it('DataStore.search should return error', function () {
                var result = ''
                    , success = function (response) {
                        result = response;
                    }
                    , error = function (err) {
                        result = 'Error';
                    };
                DataStore.search(null, TAG_NAMES.TIMER_ITEMS, null).then(success, error);
                $rootScope.$digest();
                expect(result).toEqual('Error');
            });
            it('DataStore.search should return success', function () {
                var result = ''
                    , success = function (response) {
                        result = response;
                    }
                    , error = function (err) {
                        result = err;
                    };
                DataStore.search( {}, TAG_NAMES.TIMER_ITEMS, null).then(success, error);
                $rootScope.$digest();
                expect(result).toEqual('Success');
            });
        });

        /*it('DataStore.save should return error', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = 'Error';
                };
            DataStore.save(null).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Error');
        });
        it('DataStore.save should return success', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = err;
                };
            DataStore.save({name: 'Daniel Hindi'}).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Success');
        });

        it('DataStore.delete should return error', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = 'Error';
                };
            DataStore.delete(null).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Error');
        });
        it('DataStore.delete should return success', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = err;
                };
            DataStore.delete({name: 'Daniel Hindi'}).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Success');
        });*/

    });
});