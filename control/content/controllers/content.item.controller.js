'use strict';

(function (angular, buildfire) {
    angular
        .module('fixedTimerPluginContent')
        .controller('ContentItemCtrl', ['$scope', 'STATUS_CODE', 'TAG_NAMES', 'MESSAGES', 'DataStore', 'Location', '$timeout',
            function ($scope, STATUS_CODE, TAG_NAMES, MESSAGES, DataStore, Location, $timeout) {
                var ContentItem = this;
                ContentItem.item = {
                    data: {
                        "title": "",
                        "description": "<p></p>",
                        "timer": ""
                    }
                };
                var tmrDelay = null;
                ContentItem.Alldata = {};
                ContentItem.bodyWYSIWYGOptions = {
                    plugins: 'advlist autolink link image lists charmap print preview',
                    skin: 'lightgray',
                    trusted: true,
                    theme: 'modern'
                };

                /*On click button done it redirects to home*/
                ContentItem.done = function () {
                    Location.goToHome();
                };

                ContentItem.masterData = {};

                /*Update the Master data object*/
                ContentItem.updateMasterItem = function (data) {
                    ContentItem.masterData = angular.copy(data);
                };

                ContentItem.updateMasterItem(ContentItem.item);

                ContentItem.isUnchanged = function (data) {
                    console.log('LLLLLLLLLLLLLLLLLLLL equals result:::::::', data, ContentItem.masterData, angular.equals(data, ContentItem.masterData));
                    return angular.equals(data, ContentItem.masterData);
                };

                /*SAVED DATA CALL START*/
                ContentItem.saveData = function (newObj, tag) {
                    if (typeof newObj === 'undefined') {
                        return;
                    }
                    ContentItem.success = function (result) {
                        ContentItem.Alldata = result;
                        console.info('Saved data result inside item controller: ', result);
                        ContentItem.updateMasterItem(newObj);
                    };
                    ContentItem.error = function (err) {
                        console.error('Error while saving data : ', err);
                    };
                    console.log("----------------------", ContentItem.Alldata)
                    // if(ContentItem.Alldata.id){
                    //     DataStore.update(newObj, tag).then(ContentItem.success, ContentItem.error);
                    //  }else {
                    DataStore.insert(newObj, tag).then(ContentItem.success, ContentItem.error);
                    //  }
                };

                ContentItem.saveDataWithDelay = function (newObj) {
                    console.log('hello ::::::::::::::::::::', newObj);
                    if (newObj) {
                        if (ContentItem.isUnchanged(newObj)) {
                            return;
                        }
                        if (tmrDelay) {
                            clearTimeout(tmrDelay);
                            console.log('-------------------> setTimeout of tmrDelay inside if');
                        }
                        tmrDelay = setTimeout(function () {
                            console.log('-------------------> setTimeout of tmrDelay');
                            if (ContentItem.item.data.title && ContentItem.item.data.timer) {
                                ContentItem.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.TIMER_ITEMS);
                            }
                        }, 500);
                    }
                };
                $scope.$watch(function () {
                    return ContentItem.item;
                }, ContentItem.saveDataWithDelay, true);

                /*SAVED DATA CALL END*/
            }]);
})(window.angular, window.buildfire);