'use strict';
(function (angular) {
    angular
        .module('fixedTimerPluginWidget', ['ngRoute', 'angular-owl-carousel', 'ngTouch'])
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
        }])
    /**
     * A directive which is used handle background image for layouts.
     */
        .directive('backImg', ["$rootScope", function ($rootScope) {
            return function (scope, element, attrs) {
                attrs.$observe('backImg', function (value) {
                    var img = '';
                    if (value) {
                        buildfire.imageLib.local.cropImage(value, {
                            width: $rootScope.deviceWidth,
                            height: $rootScope.deviceHeight
                        }, function (err, imgUrl) {
                            if(imgUrl) {
                                img = imgUrl;
                                element.attr("style", 'background:url(' + img + ') !important ;background-size: cover !important;');
                            } else {
                                img = '';
                                element.attr("style", 'background-color:white');
                            }
                        });
                    }
                    else {
                        img = "";
                        element.attr("style", 'background-color:white');
                        element.css({
                            'background-size': 'cover'
                        });
                    }
                });
            };
        }])
        .run([ '$rootScope',
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
