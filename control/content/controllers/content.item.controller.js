'use strict';

(function (angular, buildfire) {
    angular
        .module('fixedTimerPluginContent')
        .controller('ContentItemCtrl', ['$scope', '$routeParams', 'RankOfLastItem', 'STATUS_CODE', 'TAG_NAMES', 'MESSAGES', 'DataStore', 'Location', '$timeout',
            function ($scope, $routeParams, RankOfLastItem, STATUS_CODE, TAG_NAMES, MESSAGES, DataStore, Location, $timeout) {
                var ContentItem = this;
                var breadCrumbFlag = true;
                /**
                 * Breadcrumbs  related implementation
                 */
                buildfire.history.get('pluginBreadcrumbsOnly', function (err, result) {
                    if(result && result.length) {
                        result.forEach(function(breadCrumb) {
                            if(breadCrumb.label == 'Item') {
                                breadCrumbFlag = false;
                            }
                        });
                    }
                    if(breadCrumbFlag) {
                        buildfire.history.push('Item', { elementToShow: 'Item' });
                    }
                });
                var _rankOfLastItem = RankOfLastItem.getRank();
                ContentItem.isUpdating = false;
                ContentItem.isNewItemInserted = false;
                var _data = {
                    data: {
                        "title": "",
                        "description": "<p></p>",
                        "timer": "",
                        "rank": _rankOfLastItem
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
                        ContentItem.item = result.data;
                        ContentItem.item.id = result.id;
                        _data.rank = result.data.rank;
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
                ContentItem.done = function (event, newObj) {
                    event.preventDefault();
                    if (newObj && newObj.id) {
                        ContentItem.updateItemData(newObj.id, ContentItem.item, TAG_NAMES.TIMER_ITEMS);
                    }
                    buildfire.history.pop();
                };

                ContentItem.updateItemData = function (id, data, tagName) {
                    var success = function (result) {
                        console.log('item updated successfully and updated item is: ', result);
                        ContentItem.isUpdating = false;
                        buildfire.messaging.sendMessageToWidget({
                            id: id,
                            type: 'UpdateItem',
                            data: ContentItem.item
                        });
                        Location.goToHome();
                    };
                    var error = function (err) {
                        ContentItem.isUpdating = false;
                        console.error('There was a problem saving your data');
                        Location.goToHome();
                    };
                    if (id)
                        DataStore.update(id, data, tagName).then(success, error);
                };

                ContentItem.masterData = {};

                /*Update the Master data object*/
                ContentItem.updateMasterItem = function (data) {
                    ContentItem.masterData = angular.copy(data);
                };

                ContentItem.updateMasterItem(ContentItem.item);

                ContentItem.isUnchanged = function (data) {
                    return angular.equals(data, ContentItem.masterData);
                };

                /*SAVED DATA CALL START*/
                ContentItem.saveData = function (newObj, tag) {
                    console.log('Save data called-----------------------------------', newObj);
                    ContentItem.isNewItemInserted = true;
                    if (typeof newObj === 'undefined') {
                        return;
                    }
                    _rankOfLastItem = _rankOfLastItem + 10;
                    newObj.data.rank = _rankOfLastItem;
                    ContentItem.success = function (result) {
                        ContentItem.isUpdating = false;
                        ContentItem.item = result.data;
                        ContentItem.item.id = result.id;
                        ContentItem.item.data.rank = result.data.data.rank;
                        RankOfLastItem.setRank(_rankOfLastItem);
                        _data.rank = ContentItem.item.data.rank;
                        console.info('Saved data result inside item controller: ', result);
                        buildfire.messaging.sendMessageToWidget({
                            id: result.id,
                            type: 'AddNewItem',
                            data: ContentItem.item
                        });
                        DataStore.get(TAG_NAMES.TIMER_INFO).then(function (result) {
                            console.log('result of getting timer info is::::::::::::::::', result);
                            if (result && result.data && result.data.content)
                                result.data.content.rankOfLastItem = _rankOfLastItem;
                            else
                                result.data.content = {rankOfLastItem: _rankOfLastItem};
                            DataStore.save(result.data, TAG_NAMES.TIMER_INFO).then(function (result) {
                                console.log('Result is::::::::: ', result);
                            }, function (err) {
                                console.log('error is: ', err);
                            });
                        }, function (err) {
                            if (err) {
                                console.error('There was a problem saving your data', err);
                            }
                        });

                        ContentItem.updateMasterItem(newObj);
                    };
                    ContentItem.error = function (err) {
                        ContentItem.isUpdating = false;
                        ContentItem.isNewItemInserted = false;
                        console.error('Error while saving data : ', err);
                    };
                    console.log("----------------------", ContentItem.Alldata);
                    // if(ContentItem.Alldata.id){
                    //     DataStore.update(newObj, tag).then(ContentItem.success, ContentItem.error);
                    //  }else {
                    DataStore.insert(newObj, tag).then(ContentItem.success, ContentItem.error);
                    //  }
                };

                function isValidItem(item) {
                    console.log('Item called----------------------------is valid', item);
                    return item.title || item.timer;
                }

                var tmrDelayForPeoples = null;
                ContentItem.saveDataWithDelay = function (newObj) {
                    console.log('hello ::::::::::::::::::::', newObj, ContentItem.item);
                    clearTimeout(tmrDelayForPeoples);
                    ContentItem.isUpdating = false;
//                    ContentItem.unchangedData = angular.equals(_data, ContentItem.item);
                    ContentItem.isItemValid = isValidItem(ContentItem.item.data);
                    if (!ContentItem.isUpdating && !ContentItem.isUnchanged(ContentItem.item) && ContentItem.isItemValid && ContentItem.item.data.title && ContentItem.item.data.timer && ContentItem.item.data.timer.hrs!=undefined && ContentItem.item.data.timer.min!=undefined && ContentItem.item.data.timer.sec!=undefined) {
                        if(ContentItem.item.data.timer.hrs + ContentItem.item.data.timer.min + ContentItem.item.data.timer.sec) {
                            tmrDelayForPeoples = setTimeout(function () {
                                console.log("AAAAAAAAAAAAA", newObj);
                                if (!ContentItem.isNewItemInserted && !newObj.id) {
                                    ContentItem.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.TIMER_ITEMS);
                                }
                            }, 300);
                        }
                    }
                };

                $scope.$watch(function () {
                    return ContentItem.item;
                }, ContentItem.saveDataWithDelay, true);

                /*SAVED DATA CALL END*/
            }]);
})(window.angular, window.buildfire);