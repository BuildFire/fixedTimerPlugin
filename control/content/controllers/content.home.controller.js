'use strict';

(function (angular, buildfire) {
    angular
        .module('fixedTimerPluginContent')
        .controller('ContentHomeCtrl', ['$scope','STATUS_CODE','TAG_NAMES','DataStore','$timeout',
            function ($scope, STATUS_CODE, TAG_NAMES, DataStore, $timeout) {
                console.log('inside content home controller ----------------->');
                var ContentHome = this;

                /*Content home data seclaration with default value */

                ContentHome.data = {
                    "content" : {
  	                                 "title" : "",
                                     "defaultSortType":""
                                 },
                     "design" : {
                                    "bgImage" : ""
                                 }
                    }
                ContentHome.sortTypeData = [
                    "Manually", "Item Name A-Z", "Item Name Z-A", "Newest First", "Oldest First"
                ];

            /*Init method call, it will bring all the pre saved data*/
                ContentHome.init = function () {
                    ContentHome.success = function (result) {
                        console.info('init success result:', result);
                        if (result) {
                            ContentHome.data = result.data;
                        }
                    };
                    ContentHome.error = function (err) {
                        if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                            console.error('Error while getting data', err);
                        }
                        else if (err && err.code === STATUS_CODE.NOT_FOUND) {
                            ContentHome.saveData(JSON.parse(angular.toJson(ContentHome.data)), TAG_NAMES.TIMER_INFO);
                        }
                    };
                    DataStore.get(TAG_NAMES.TIMER_INFO).then(ContentHome.success, ContentHome.error);
                };
                ContentHome.init();

                ContentHome.SavedMainTitle = function() {
                    $timeout(function () {
                        ContentHome.saveData(JSON.parse(angular.toJson(ContentHome.data)), TAG_NAMES.TIMER_INFO);
                    }, 1000);
                };

                ContentHome.saveData = function (newObj, tag) {
                    if (typeof newObj === 'undefined') {
                        return;
                    }
                    ContentHome.success = function (result) {
                        console.info('Saved data result: ', result);
                        // updateMasterItem(newObj);
                    };
                    ContentHome.error = function (err) {
                        console.error('Error while saving data : ', err);
                    };
                    DataStore.save(newObj, tag).then(ContentHome.success, ContentHome.error);
                };
            }]);
})(window.angular, window.buildfire);