'use strict';

(function (angular, window) {
    angular
        .module('fixedTimerPluginWidget')
        .controller('WidgetHomeCtrl', ['$scope','Buildfire','DataStore','TAG_NAMES',
            function ($scope, Buildfire, DataStore, TAG_NAMES) {
                    var WidgetHome = this;
                        WidgetHome.ItemTitle="Item Title"
            }]);
})(window.angular);