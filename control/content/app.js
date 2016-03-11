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
        .run(['Location','Buildfire', function (Location,Buildfire) {
            // Handler to receive message from widget
            Buildfire.history.onPop(function(data, err){
                if(data && data.label!='Item')
                    Location.goToHome();
                console.log('Buildfire.history.onPop called', data, err);
            });
        }])
})(window.angular,window.buildfire);