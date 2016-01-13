'use strict';

(function (angular) {
    angular
        .module('fixedTimerPluginDesign')
        .controller('DesignHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES',
            function ($scope, Buildfire, DataStore, TAG_NAMES) {
                var DesignHome = this;
                var background;

                function init() {
                    var itemInfo = {};
                    itemInfo.backgroundImage = '';
                    Buildfire.datastore.get(TAG_NAMES.FIXED_TIMER, function (err, data) {
                        if (err) {
                            Console.log('------------Error in Design of Fiext Timer Plugin------------', err);
                        }
                        else if (data && data.data) {
                            DesignHome.itemInfo = angular.copy(data.data);
                            if (DesignHome.itemInfo.backgroundImage) {
                                background.loadbackground(DesignHome.itemInfo.backgroundImage);
                            }
                            $scope.$digest();
                        }
                        else {
                            DesignHome.itemInfo = itemInfo;
                            console.info('------------------unable to load data---------------');
                        }
                    });
                }

                background = new Buildfire.components.images.thumbnail("#background");
                background.onChange = function (url) {
                    DesignHome.itemInfo.backgroundImage = url;
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }
                };

                background.onDelete = function (url) {
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
                                return DesignHome.itemInfo;
                            }
                            else if (data && data.obj) {
                                return data.obj;
                            }
                            $scope.$digest();
                        });
                }, true);
            }]);
})(window.angular);