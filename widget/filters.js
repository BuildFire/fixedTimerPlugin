'use strict';

(function (angular, buildfire, location) {
    //created mediaCenterWidget module
    angular
        .module('timerFilters', [])
        .filter('cropImage', [function () {
            return function (url, width, height, type) {
                return buildfire.imageLib.cropImage(url, {
                    width: width,
                    height: height
                });
            }
        }])
})(window.angular, window.buildfire, window.location);