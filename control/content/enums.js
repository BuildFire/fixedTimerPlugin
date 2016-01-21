'use strict';

(function (angular) {
    angular.module('fixedTimerPluginContent')
        .constant('TAG_NAMES', {
            TIMER_INFO: 'timerInfo',
            TIMER_ITEMS: 'timerItems'
        })
        .constant('STATUS_CODE', {
            INSERTED: 'inserted',
            UPDATED: 'updated',
            NOT_FOUND: 'NOTFOUND',
            UNDEFINED_DATA: 'UNDEFINED_DATA',
            UNDEFINED_OPTIONS: 'UNDEFINED_OPTIONS',
            UNDEFINED_ID: 'UNDEFINED_ID',
            ITEM_ARRAY_FOUND: 'ITEM_ARRAY_FOUND',
            NOT_ITEM_ARRAY: 'NOT_ITEM_ARRAY'
        })
        .constant('STATUS_MESSAGES', {
            UNDEFINED_DATA: 'Undefined data provided',
            UNDEFINED_OPTIONS: 'Undefined options provided',
            UNDEFINED_ID: 'Undefined id provided',
            NOT_ITEM_ARRAY: 'Array of Items not provided',
            ITEM_ARRAY_FOUND: 'Array of Items provided'
        })
        .constant('MESSAGES', {
            ERROR: {
                NOT_FOUND: "No result found",
                CALLBACK_NOT_DEFINED: "Callback is not defined",
                ID_NOT_DEFINED: "Id is not defined",
                DATA_NOT_DEFINED: "Data is not defined",
                OPTION_REQUIRES: "Requires options",
                TAG_NOT_DEFINED: "Tag is not defined"
            }
        })
})(window.angular);