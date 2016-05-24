'use strict';
(function (angular) {
    angular
        .module('fixedTimerPluginWidget', ['ngRoute', 'angular-owl-carousel', 'timerFilters', 'ngTouch'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/home.html',
                    controllerAs: 'WidgetHome',
                    controller: 'WidgetHomeCtrl',
                    resolve: {
                        context: function (Context) {
                            return Context.getContext();
                        }
                    }
                })
                .otherwise('/');
        }]).filter('secondsToDateTime', [function () {
            return function (seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
        }]).run([ '$rootScope',
            function ($rootScope) {
                buildfire.messaging.onReceivedMessage = function (msg) {
                    console.log('============ inside on received message app.js widget', msg);
                    switch (msg.type) {
                        case 'AddNewItem':
                            $rootScope.$broadcast("TIMER_ADDED", msg);
                            break;
                        case 'UpdateItem':
                            $rootScope.$broadcast("TIMER_UPDATED", msg);
                            break;
                        case 'ArrangeItems':
                            $rootScope.$broadcast("ITEMS_REARRANGE", msg);
                            break;
                    }
                }
            }])
})(window.angular);
