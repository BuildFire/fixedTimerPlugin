'use strict';

(function (angular, buildfire) {
    angular
        .module('fixedTimerPluginContent')
        .controller('ContentHomeCtrl', ['$scope', 'Modals', 'RankOfLastItem', 'STATUS_CODE', 'TAG_NAMES', 'MESSAGES', 'DataStore', 'Location', '$timeout',
            function ($scope, Modals, RankOfLastItem, STATUS_CODE, TAG_NAMES, MESSAGES, DataStore, Location, $timeout) {
                console.log('inside content home controller ----------------->');
                var ContentHome = this;
                var tmrDelay = null;

                /*Content home data seclaration with default value */

                ContentHome.data = {
                    "content": {
                        "title": "",
                        "rankOfLastItem": 0
                    },
                    "design": {
                        "bgImage": ""
                    }
                };
                ContentHome.searchOptions = {
                    sort: {"data.rank": 1}
                };

                ContentHome.masterData = angular.copy(ContentHome.data);
                ContentHome.sortTypeData = [
                    "Manually", "Item Name A-Z", "Item Name Z-A", "Newest First", "Oldest First"
                ];

                RankOfLastItem.setRank(ContentHome.data.content.rankOfLastItem || 0);

                ContentHome.itemsSortableOptions = {
                    handle: '> .cursor-grab',
                    stop: function (e, ui) {
                        console.log('Dragged called------------------------------------------', e, ui, 'stop');
                        var endIndex = ui.item.sortable.dropindex,
                            maxRank = 0,
                            draggedItem = ContentHome.items[endIndex];

                        if (draggedItem) {
                            console.log('Dragged--------------------------------------------------------------', draggedItem);
                            var prev = ContentHome.items[endIndex - 1],
                                next = ContentHome.items[endIndex + 1];
                            var isRankChanged = false;
                            if (next) {
                                if (prev) {
                                    draggedItem.data.data.rank = ((prev.data.data.rank || 0) + (next.data.data.rank || 0)) / 2;
                                    isRankChanged = true;
                                } else {
                                    draggedItem.data.data.rank = (next.data.data.rank || 0) / 2;
                                    isRankChanged = true;
                                }
                            } else {
                                if (prev) {
                                    draggedItem.data.data.rank = (((prev.data.data.rank || 0) * 2) + 10) / 2;
                                    maxRank = draggedItem.data.data.rank;
                                    isRankChanged = true;
                                }
                            }
                            if (isRankChanged) {
                                var success = function (response) {
                                    console.log('Updated rank of the item-------------------', draggedItem);
                                    if (ContentHome.data.content.rankOfLastItem < maxRank) {
                                        ContentHome.data.content.rankOfLastItem = maxRank;
                                        RankOfLastItem.setRank(maxRank);
                                    }
                                    buildfire.messaging.sendMessageToWidget({
                                        type: 'ArrangeItems'
                                    });
                                };
                                var error = function (err) {
                                    console.error('Error during updating rank');
                                };
                                DataStore.update(draggedItem.id, draggedItem.data, TAG_NAMES.TIMER_ITEMS).then(success, error);
                            }
                        }
                    }
                };

                /*Update the Master data object*/
                ContentHome.updateMasterItem = function (data) {
                    ContentHome.masterData = angular.copy(data);
                };

                ContentHome.isUnchanged = function (data) {
                    return angular.equals(data, ContentHome.masterData);
                };

                /*INIT CALL START*/
                /*Init method call, it will bring all the pre saved data*/
                ContentHome.init = function () {
                    ContentHome.success = function (result) {
                        console.info('init success result:', result);
                        if (result) {
                            ContentHome.data = result.data;
                            console.log("LLLLLLLLL 2")
                            ContentHome.updateMasterItem(ContentHome.data);
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

                    ContentHome.successCallback = function (result) {
                        console.info('init success result:', result);
                        console.log("+++++++++++++7", result);
                        if (result && result.length > 0) {
                            ContentHome.items = result;
                        }
                    };
                    ContentHome.errorCallback = function (err) {
                        if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                            console.error('Error while getting data', err);
                        }
                    };
                    DataStore.search(ContentHome.searchOptions, TAG_NAMES.TIMER_ITEMS).then(ContentHome.successCallback, ContentHome.errorCallback);
                };
                ContentHome.init();
                /*INIT CALL END*/

                /**
                 * ContentHome.removeListItem() used to delete an item from people list
                 * @param _index tells the index of item to be deleted.
                 */
                ContentHome.removeListItem = function (_index) {
                    var item = ContentHome.items[_index];
                    Modals.removePopupModal(item).then(function (data) {
                        // Deleting post having id as postId
                        var success = function (result) {
                            console.log('inside success of delete item and result is: ', result);
                            ContentHome.items.splice(_index, 1);
                        };
                        var error = function (err) {
                            console.log('inside error of delete items and error is: ', err);
                        };
                        DataStore.delete(item.id, TAG_NAMES.TIMER_ITEMS).then(success, error);
                    }, function (err) {
                        console.log('Error is: ', err);
                    });
                };

                /*SAVED DATA CALL START*/
                ContentHome.saveData = function (newObj, tag) {
                    ContentHome.success = function (result) {
                        console.info('Saved data result: ', result);
                        ContentHome.updateMasterItem(newObj);
                    };
                    ContentHome.error = function (err) {
                        console.error('Error while saving data : ', err);
                    };
                    if (newObj == undefined)
                        return;
                    else {
//                        newObj.content.rankOfLastItem = newObj.content.rankOfLastItem || 0;
                        DataStore.save(newObj, tag).then(ContentHome.success, ContentHome.error);
                    }
                };

                ContentHome.saveDataWithDelay = function (newObj) {
                    console.log('newObj is LLLLLLLLLLLLLLLLLLLLL', ContentHome.isUnchanged(newObj), newObj);

                    if (newObj) {
                        if (ContentHome.isUnchanged(newObj)) {
                            return;
                        }
                        if (tmrDelay) {
                            clearTimeout(tmrDelay);
                        }
                        tmrDelay = setTimeout(function () {
                            ContentHome.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.TIMER_INFO);
                        }, 500);
                    } else
                        return;
                };

                $scope.$watch(function () {
                    return ContentHome.data;
                }, ContentHome.saveDataWithDelay, true);

                /*SAVED DATA CALL END*/
            }]);
})(window.angular, window.buildfire);