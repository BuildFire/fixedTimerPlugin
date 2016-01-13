'use strict';

(function (angular, buildfire) {
    angular
        .module('fixedTimerPluginContent')
        .controller('ContentItemCtrl', ['$scope',
            function ($scope) {
                console.log('inside content item controller ----------------->');
            }]);
})(window.angular, window.buildfire);