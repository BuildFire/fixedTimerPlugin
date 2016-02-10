describe('Unit: fixedTimerPluginWidget widget app', function () {
  describe('Unit: app routes', function () {
      beforeEach(module('fixedTimerPluginWidget'));
      var location, route, rootScope, compile, scope;
      beforeEach(inject(function (_$rootScope_, _$compile_, $rootScope) {
          // route = _$route_;
          rootScope = _$rootScope_;
          compile = _$compile_;
          scope = $rootScope.$new();
      }));

      describe('Home route', function () {
          beforeEach(inject(
              function ($httpBackend) {
                  $httpBackend.expectGET('/')
                      .respond(200);
                  $httpBackend.expectGET('/')
                      .respond(200);
              }));
          it('should load the home page on successful load of location path /', function () {

          });

      });

  });
    describe('Test the filter', function () {
        'use strict';

        var $filter;

        beforeEach(function () {
            module('fixedTimerPluginWidget');

            inject(function (_$filter_) {
                $filter = _$filter_;
            });
        });

        it('should change the format of date', function () {
            // Arrange.
            var time = new Date(100000), result;
//            var updatedUrl = 80200000;
            // Act.
            result = $filter('secondsToDateTime')(time);

            // Assert.
              expect(result).toBeDefined();
//            expect(result).toEqual(100000000);
        });
    });

    describe('calling the buildfire.messaging.onReceivedMessage for AddNewItem condition', function () {
        var $rootScope;
        beforeEach(module('fixedTimerPluginWidget'));
        beforeEach(inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'AddNewItem',
            data:{
                pointsToRedeem:5
            }
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });
    });

    describe('calling the buildfire.messaging.onReceivedMessage for UpdateItem condition', function () {
        var $rootScope;
        beforeEach(module('fixedTimerPluginWidget'));
        beforeEach(inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'UpdateItem',
            data:{
                pointsToRedeem:5
            }
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });
    });


    describe('calling the buildfire.messaging.onReceivedMessage for ArrangeItems condition', function () {
        var $rootScope;
        beforeEach(module('fixedTimerPluginWidget'));
        beforeEach(inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'ArrangeItems',
            data:{
                pointsToRedeem:5
            }
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });
    });
});