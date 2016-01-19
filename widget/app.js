'use strict';
(function (angular) {
    angular
        .module('fixedTimerPluginWidget', ['ngRoute', 'angular-owl-carousel', 'timerFilters'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/home.html',
                    controllerAs: 'WidgetHome',
                    controller: 'WidgetHomeCtrl'
                })
                .otherwise('/');
        }]).filter('secondsToDateTime', [function() {
            return function(seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
        }]).run([ '$rootScope',
            function ($rootScope) {
                buildfire.messaging.onReceivedMessage = function (msg) {
                    console.log('============',msg)
                    switch (msg.type) {
                        case 'AddNewItem':
                            $rootScope.$broadcast("TIMER_ADDED", msg);
                            $rootScope.$apply();
                            break;
                    }
                }
            }])
})(window.angular);
