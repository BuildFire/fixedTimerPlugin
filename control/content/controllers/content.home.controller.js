'use strict';

(function (angular, buildfire) {
    angular
        .module('fixedTimerPluginContent')
        .controller('ContentHomeCtrl', ['$scope',
            function ($scope) {
                console.log('inside content home controller ----------------->');
            }]);
})(window.angular, window.buildfire);