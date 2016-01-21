describe('Unit : fixedTimerPlugin content.item.controller.js', function () {
    var $scope, $routeParams, ContentItem, $rootScope, q, $controller, Buildfire, TAG_NAMES, $timeout;
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
                this.datastore.getById.and.callFake(function (_id, _tagName, callback) {
                    if (!_id || !typeof callback === 'function') {
                        callback('Error', null);
                    } else {
                        callback(null, 'Success');
                    }
                });
            });
        }));
        beforeEach(inject(function (_$rootScope_, _$routeParams_, _DataStore_, _Buildfire_, _TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
            $rootScope = _$rootScope_;
            DataStore = _DataStore_;
            Buildfire = _Buildfire_;
            TAG_NAMES = _TAG_NAMES_;
            STATUS_CODE = _STATUS_CODE_;
            STATUS_MESSAGES = _STATUS_MESSAGES_;
            $routeParams = _$routeParams_;
        }));

        beforeEach(function () {

            inject(function ($injector, $q) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                ContentItem = $injector.get('$controller')('ContentItemCtrl', {
                    $scope: $scope,
                    TAG_NAMES: TAG_NAMES,
                    Buildfire: Buildfire,
                    $routeParams: $routeParams
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
        it('$routeParams.itemId exist', function () {
            $routeParams.itemId = '123';
            ContentItem.getItem($routeParams.itemId);
        });
    });
});