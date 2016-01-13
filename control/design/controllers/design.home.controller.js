'use strict';

(function (angular, window) {
    angular
        .module('fixedTimerPluginDesign')
        .controller('DesignHomeCtrl', ['$scope','Buildfire','DataStore','TAG_NAMES',
            function ($scope, Buildfire, DataStore, TAG_NAMES) {
                    var DesignHome = this;
                        DesignHome.BackgrundImageTitle ='Background Image';
                        DesignHome.BackgrundImageComponent ='Background Image Component'
            }]);
})(window.angular);