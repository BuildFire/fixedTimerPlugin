'use strict';

(function (angular, buildfire) {
    angular
        .module('fixedTimerPluginContent')
        .controller('ContentItemCtrl', ['$scope', '$routeParams', 'STATUS_CODE', 'TAG_NAMES', 'MESSAGES', 'DataStore', 'Location', '$timeout',
            function ($scope, $routeParams, STATUS_CODE, TAG_NAMES, MESSAGES, DataStore, Location, $timeout) {
                var ContentItem = this;
                ContentItem.isUpdating = false;
                ContentItem.isNewItemInserted = false;
                var _data = {
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

                ContentItem.item = angular.copy(_data);

                ContentItem.getItem = function (itemId) {
                    var success = function (result) {
                        console.log('inside success of getting item details and result is: ', result);
                        ContentItem.item = result;

                        ContentItem.updateMasterItem(ContentItem.item);
                    };
                    var error = function (err) {
                        console.log('error while getting item details and error is: ', err);
                        throw console.error('There was a problem saving your data', err);
                    };
                    DataStore.getById(itemId, TAG_NAMES.TIMER_ITEMS).then(success, error);
                };

                if ($routeParams.itemId) {
                    ContentItem.getItem($routeParams.itemId);
                }

                /*On click button done it redirects to home*/
                ContentItem.done = function () {
                    Location.goToHome();
                };

                ContentItem.updateItemData = function (id, data, tagName) {
                    var success = function (result) {
                        console.log('item updated successfully and updated item is: ', result);
                        ContentItem.isUpdating = false;
                    };
                    var error = function (err) {
                        ContentItem.isUpdating = false;
                        console.error('There was a problem saving your data');
                    };
                    DataStore.update(id, data, tagName).then(success, error);
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
                    console.log('Save data called-----------------------------------');
                    ContentItem.isNewItemInserted = true;
                    if (typeof newObj === 'undefined') {
                        return;
                    }
                    ContentItem.success = function (result) {
                        ContentItem.isUpdating = false;
                        ContentItem.Alldata = result;
                        console.info('Saved data result inside item controller: ', result);
                        ContentItem.updateMasterItem(newObj);
                    };
                    ContentItem.error = function (err) {
                        ContentItem.isUpdating = false;
                        ContentItem.isNewItemInserted = false;
                        console.error('Error while saving data : ', err);
                    };
                    console.log("----------------------", ContentItem.Alldata)
                    // if(ContentItem.Alldata.id){
                    //     DataStore.update(newObj, tag).then(ContentItem.success, ContentItem.error);
                    //  }else {
                    DataStore.insert(newObj, tag).then(ContentItem.success, ContentItem.error);
                    //  }
                };

                function isValidItem(item) {
                    console.log('Item called----------------------------is valid',item);
                    return item.title || item.timer;
                }
                var tmrDelayForPeoples = null;
                ContentItem.saveDataWithDelay = function (newObj) {
                    console.log('hello ::::::::::::::::::::', newObj, ContentItem.item);
                        clearTimeout(tmrDelayForPeoples);
                        ContentItem.isUpdating = false;
//                    ContentItem.unchangedData = angular.equals(_data, ContentItem.item);
                    console.log('OOOOOOOOOOOOOOOOOOOOOOOO', ContentItem.isNewItemInserted);
                    ContentItem.isItemValid = isValidItem(ContentItem.item.data);
                    console.log('before final if to save or update dataLLLLLLLLLLLLLLL', !ContentItem.isUpdating, !ContentItem.isUnchanged(ContentItem.item),ContentItem.isItemValid);
                    if (!ContentItem.isUpdating && !ContentItem.isUnchanged(ContentItem.item) && ContentItem.isItemValid) {
                            tmrDelayForPeoples = setTimeout(function () {
                                if (newObj && newObj.data && newObj.data.title) {
                                    ContentItem.updateItemData(newObj.id, ContentItem.item.data, TAG_NAMES.TIMER_ITEMS);
                                } else if (!ContentItem.isNewItemInserted) {
                                    ContentItem.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.TIMER_ITEMS);
                                }
                            }, 300);
                        }







                    /*if (newObj) {
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
                    }*/
                };
                $scope.$watch(function () {
                    return ContentItem.item;
                }, ContentItem.saveDataWithDelay, true);

                /*SAVED DATA CALL END*/
            }]);
})(window.angular, window.buildfire);