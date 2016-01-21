'use strict';

(function (angular,buildfire) {
    angular.module('fixedTimerPluginContent', ['ngRoute', 'ui.bootstrap', 'ui.tinymce', 'timerModals', 'ui.sortable'])
        //injected ngRoute for routing
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/home.html',
                    controllerAs: 'ContentHome',
                    controller: 'ContentHomeCtrl'
                })
                .when('/item', {
                    templateUrl: 'templates/timerItem.html',
                    controllerAs: 'ContentItem',
                    controller: 'ContentItemCtrl'
                })
                .when('/item/:itemId', {
                    templateUrl: 'templates/timerItem.html',
                    controllerAs: 'ContentItem',
                    controller: 'ContentItemCtrl'
                })
                .otherwise('/');
        }])
})(window.angular,window.buildfire);