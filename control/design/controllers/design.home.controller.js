'use strict';

(function (angular) {
    angular
        .module('fixedTimerPluginDesign')
        .controller('DesignHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES',
            function ($scope, Buildfire, DataStore, TAG_NAMES) {
                var DesignHome = this;

                function init() {
                    var itemInfo = {};
                    itemInfo.backgroundImage = '';
                    Buildfire.datastore.get(TAG_NAMES.FIXED_TIMER, function (err, data) {
                        if (err) {
                            console.log('------------Error in Design of Fixed Timer Plugin------------', err);
                        }
                        else if (data && data.data) {
                            DesignHome.itemInfo = angular.copy(data.data);
                            if (DesignHome.itemInfo.backgroundImage) {
                                DesignHome.background.loadbackground(DesignHome.itemInfo.backgroundImage);
                            }
                            if (!$scope.$$phase && !$scope.$root.$$phase) {
                                $scope.$digest();
                            }
                        }
                        else {
                            DesignHome.itemInfo = itemInfo;
                            console.info('------------------unable to load data---------------');
                        }
                    });
                }

                DesignHome.background = new Buildfire.components.images.thumbnail("#background");
                DesignHome.background.onChange = function (url) {
                    DesignHome.itemInfo.backgroundImage = url;
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }
                };

                DesignHome.background.onDelete = function (url) {
                    DesignHome.itemInfo.backgroundImage = "";
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }
                };
                init();
                $scope.$watch(function () {
                    return DesignHome.itemInfo;
                }, function (newObj) {
                    if (newObj)
                        Buildfire.datastore.save(DesignHome.itemInfo, TAG_NAMES.FIXED_TIMER, function (err, data) {
                            if (err) {
                                console.log("Error while saving data");
                            }
                        });
                }, true);
            }]);
})(window.angular);