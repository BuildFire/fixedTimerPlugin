'use strict';

(function (angular) {
  angular
    .module('fixedTimerPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
        var WidgetHome = this;
        WidgetHome.data = null;
        WidgetHome.items =['item1', 'item2', 'item3', 'item4', 'item5', 'item6','item1', 'item2', 'item3', 'item4', 'item5', 'item6'];
        WidgetHome.busy = false;

        var getTimerItems = function () {
          Buildfire.spinner.show();
          var success = function (result) {
              Buildfire.spinner.hide();
            },
            error = function () {
              Buildfire.spinner.hide();
              console.log("Error fetching events");
            };

          DataStore.search({}, TAG_NAMES.TIMER_ITEMS).then(success, error);
        };

        WidgetHome.loadMore = function () {
          if (WidgetHome.busy) return;
          WidgetHome.busy = true;
          getTimerItems();
        };

        /**
         * init() function invocation to fetch previously saved user's data from datastore.
         */
        var init = function () {
          var success = function (result) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.content)
                WidgetHome.data.content = {};
              if (!WidgetHome.data.design)
                WidgetHome.data.design = {};
            }
            , error = function (err) {
              if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                console.error('Error while getting data', err);
              }
            };

          DataStore.get(TAG_NAMES.TIMER_INFO).then(success, error);
        };

        var onUpdateCallback = function (event) {
          console.log("hiiiiiiiiiiiiiiiii",event)
          setTimeout(function () {
            if (event && event.data) {

              switch (event.data) {

                case TAG_NAMES.TIMER_INFO:

                  WidgetHome.data = event.data;
                  if (!WidgetHome.data.design)
                    WidgetHome.data.design = {};
                  if (!WidgetHome.data.content)
                    WidgetHome.data.content = {};
                  break;
                case TAG_NAMES.TIMER_ITEMS:
                  break;
              }
              $scope.$digest();
            }
          }, 0);
        };

        WidgetHome.testalert = function(test, id){

       var a= $('.item-carousel span').removeClass('text-primary');
        //  $('#'+id).addClass('text-primary');
          console.log(test);
        };
        /**
         * DataStore.onUpdate() is bound to listen any changes in datastore
         */
        DataStore.onUpdate().then(null, null, onUpdateCallback);

        init();
      }]);
})(window.angular);