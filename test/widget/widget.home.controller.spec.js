describe('Unit : fixedTimerPlugin widget.home.controller.js', function () {
    var $scope, WidgetHome, $rootScope, q, $controller, Buildfire, TAG_NAMES, $timeout;
    var fakeWindow = {
        location: {
            href: ''
        }
    };
    var Location = {
        goToHome: function () {
        },
        goTo: function () {
        }
    };
    beforeEach(module('fixedTimerPluginWidget'));


    /*// instantiate controller with mock window
     beforeEach(inject(function($controller) {
     $controller('YourCtrlName', {
     $window: fakeWindow
     });
     }));*/
    describe('Unit : For success of DataStore.get and DataStore.search', function () {
        var DataStore, Buildfire, $rootScope, TAG_NAMES, STATUS_MESSAGES, STATUS_CODE, q;
        beforeEach(module('fixedTimerPluginWidget', function ($provide) {
            $provide.service('Buildfire', function () {
                this.spinner = jasmine.createSpyObj('spinner', ['show', 'hide']);
                this.datastore = jasmine.createSpyObj('datastore', ['get', 'save', 'getById', 'search', 'insert', 'update', 'delete', 'onUpdate', 'onRefresh']);
                this.datastore.get.and.callFake(function (_tagName, callback) {
                    if (_tagName) {
                        callback(null, {data: {content: {}, design: {}}});
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
                        callback(null, [
                            {data: {data: {title: 'Item1', description: 'Item1 Description', timer: {hrs: '10', min: '2', sec: '2'}}}}
                        ]);
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
                this.datastore.onRefresh.and.callFake(function (callback) {
                    callback();
                });
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
                WidgetHome = $injector.get('$controller')('WidgetHomeCtrl', {
                    $scope: $scope,
                    TAG_NAMES: TAG_NAMES,
                    Buildfire: Buildfire,
                    Location: Location,
                    context: {instanceId: 'instanceId'},
                    $window: fakeWindow
                });
                q = $q;
                WidgetHome.allItems = [
                    {data: {data: {title: 'Item1', description: 'Item1 Description', timer: {hrs: '10', min: '2', sec: '2'}}}}
                ];
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

        describe('init calling', function () {
            it('DataStore.get should return success and actualTimerTime greater than zero', function () {
                WidgetHome.allItems = [
                    {data: {data: {title: 'Item1', description: 'Item1 Description', timer: {hrs: '10', min: '2', sec: '2'}}}}
                ];
                var result = ''
                    , success = function (response) {
                        result = response;
                        window.localStorage.setItem('timerObject', JSON.stringify({isPause: false}));
                    }
                    , error = function (err) {
                        result = err;
                    };
                DataStore.get(TAG_NAMES.TIMER_INFO).then(success, error);
                $rootScope.$digest();
//                expect(result).toEqual('Success');
            });

            it('DataStore.get should return success and actualTimerTime less than zero', function () {
                WidgetHome.allItems = [
                    {data: {data: {title: 'Item1', description: 'Item1 Description', timer: {hrs: '10', min: '2', sec: '2'}}}}
                ];
                var result = ''
                    , success = function (response) {
                        result = response;
                        window.localStorage.setItem('timerObject', JSON.stringify({isPause: false, lastUpdatedTime: 1453483372281, timerTime: 5}));
                    }
                    , error = function (err) {
                        result = err;
                    };
                DataStore.get(TAG_NAMES.TIMER_INFO).then(success, error);
                $rootScope.$digest();
//                expect(result).toEqual('Success');
            });

            it('DataStore.search should return success', function () {
                var result = ''
                    , success = function (response) {
                        result = response;
                    }
                    , error = function (err) {
                        result = err;
                    };
                DataStore.search({}, TAG_NAMES.TIMER_ITEMS, null).then(success, error);
                $rootScope.$digest();
//                expect(result).toEqual('Success');
            });
        });
        describe('WidgetHome.loadMore calling', function () {
            it('WidgetHome.busy having value false', function () {
                WidgetHome.busy = false;
                WidgetHome.loadMore();
                expect(WidgetHome.busy).toEqual(true);
            });
            it('WidgetHome.busy having value true', function () {
                WidgetHome.busy = true;
                WidgetHome.loadMore();
                expect(WidgetHome.busy).toEqual(true);
            });
        });
        describe('WidgetHome.countdown calling', function () {
            it('WidgetHome.isCounterNegative true', function () {
                WidgetHome.isCounterNegative = true;
                WidgetHome.countdown();
                expect(WidgetHome.isCounterNegative).toEqual(true);
            });
            it('WidgetHome.isCounterNegative false', function () {
                WidgetHome.isCounterNegative = false;
                WidgetHome.countdown();
                expect(WidgetHome.isCounterNegative).toEqual(false);
            });
        });
        describe('WidgetHome.silenceReset calling', function () {
            it('localStorage exist', function () {
                window.localStorage.setItem('timerObject', JSON.stringify({isPause: true}));
                WidgetHome.silenceReset();
            });
        });
        describe('WidgetHome.resetTimer calling with localStorage data', function () {
            it('localStorage exist', function () {
                window.localStorage.setItem('timerObject', JSON.stringify({isPause: true}));
                WidgetHome.resetTimer();
                $rootScope.$digest();
            });
        });
    });
    describe('Unit : For error of DataStore.get', function () {
        var DataStore, Buildfire, $rootScope, TAG_NAMES, STATUS_MESSAGES, STATUS_CODE, q;
        beforeEach(module('fixedTimerPluginWidget', function ($provide) {
            $provide.service('Buildfire', function () {
                this.spinner = jasmine.createSpyObj('spinner', ['show', 'hide']);
                this.datastore = jasmine.createSpyObj('datastore', ['get', 'save', 'getById', 'search', 'insert', 'update', 'delete', 'onUpdate', 'onRefresh']);
                this.datastore.get.and.callFake(function (_tagName, callback) {
                    callback('Error', null);
                });
                this.datastore.search.and.callFake(function (options, _tagName, callback) {
                    if (options && _tagName) {
                        callback(null, [
                            {data: {data: {title: 'Item1', description: 'Item1 Description', timer: {hrs: '10', min: '2', sec: '2'}}}}
                        ]);
                    } else {
                        callback('Error', null);
                    }
                });
                this.datastore.onRefresh.and.callFake(function (callback) {
                    callback();
                });
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
                WidgetHome = $injector.get('$controller')('WidgetHomeCtrl', {
                    $scope: $scope,
                    TAG_NAMES: TAG_NAMES,
                    Buildfire: Buildfire,
                    Location: Location,
                    context: {instanceId: 'instanceId'},
                    $window: fakeWindow
                });
                q = $q;
            });
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

            it('DataStore.search should return success', function () {
                var result = ''
                    , success = function (response) {
                        result = response;
                    }
                    , error = function (err) {
                        result = err;
                    };
                DataStore.search({}, TAG_NAMES.TIMER_ITEMS, null).then(success, error);
                $rootScope.$digest();
//                expect(result).toEqual('Success');
            });
        });
    });
    describe('Unit : For error of DataStore.search', function () {
        var DataStore, Buildfire, $rootScope, TAG_NAMES, STATUS_MESSAGES, STATUS_CODE, q;
        beforeEach(module('fixedTimerPluginWidget', function ($provide) {
            $provide.service('Buildfire', function () {
                this.spinner = jasmine.createSpyObj('spinner', ['show', 'hide']);
                this.datastore = jasmine.createSpyObj('datastore', ['get', 'save', 'getById', 'search', 'insert', 'update', 'delete', 'onUpdate', 'onRefresh']);
                this.datastore.search.and.callFake(function (options, _tagName, callback) {
                    callback('Error', null);
                });
                this.datastore.onRefresh.and.callFake(function (callback) {
                    callback();
                });
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
                WidgetHome = $injector.get('$controller')('WidgetHomeCtrl', {
                    $scope: $scope,
                    TAG_NAMES: TAG_NAMES,
                    Buildfire: Buildfire,
                    Location: Location,
                    $rootScope: $rootScope,
                    context: {instanceId: 'instanceId'},
                    $window: fakeWindow
                });
                q = $q;
            });
        });

        describe('init calling', function () {
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
        });

    });


    describe('WidgetHome.safeHtml(html)', function () {
        it('should invoke when WidgetHome.safeHtml() method called', function () {
            var html = '<div>HiTest</div>';
            WidgetHome.safeHtml(html);
        });
    });
    //
    //describe('Test the WidgetHome.listeners calls', function () {
    //    var data = {}
    //    it('should invoke TIMER_ADDED when point have some values', function () {
    //        var points = 5, callback = function (e, data) {
    //        }
    //        $rootScope.$broadcast('TIMER_ADDED', callback);
    //    });
    //});
});