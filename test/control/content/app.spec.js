describe('Unit: fixedTimerPlugin content app', function () {
    describe('Unit: app routes', function () {
        beforeEach(module('fixedTimerPluginContent'));
        var Location, route, rootScope;
        beforeEach(inject(function (_$location_, _$route_, _$rootScope_) {
            Location = _$location_;
            route = _$route_;
            rootScope = _$rootScope_;
        }));

        describe('Home route', function () {
            beforeEach(inject(
                function ($httpBackend) {
                    $httpBackend.expectGET('templates/home.html')
                        .respond(200);
                    $httpBackend.expectGET('/')
                        .respond(200);
                }));
            it('should load the home page on successful load of location path /', function () {
                Location.path('/');
                rootScope.$digest();
                expect(route.current.controller).toBe('ContentHomeCtrl');
            });
        });

        describe('Create people route', function () {
            beforeEach(inject(
                function ($httpBackend) {
                    $httpBackend.expectGET('templates/timerItem.html')
                        .respond(200);
                    $httpBackend.expectGET('/item')
                        .respond(200);
                }));
            it('should load the Item page on successful load of location path /item', function () {
                Location.path('/item');
                rootScope.$digest();
                expect(route.current.controller).toBe('ContentItemCtrl');
            });
        });

        describe('Edit people route', function () {
            beforeEach(inject(
                function ($httpBackend) {
                    $httpBackend.expectGET('templates/timerItem.html')
                        .respond(200);
                    $httpBackend.expectGET('/item/:itemId')
                        .respond(200);
                }));
            it('should load the Item page on successful load of location path /item/:itemId', function () {
                Location.path('/item/:123');
                rootScope.$digest();
                expect(route.current.controller).toBe('ContentItemCtrl');
            });
        });
    });
});