'use strict';

(function (angular) {
  angular
    .module('fixedTimerPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', '$sce',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, $sce) {
        var WidgetHome = this;
        WidgetHome.data = null;
        WidgetHome.items =['item1', 'item2', 'item3', 'item4', 'item5', 'item6','item1', 'item2', 'item3', 'item4', 'item5', 'item6'];
        WidgetHome.busy = false;
        WidgetHome.allItems={};

        var getTimerItems = function () {
          Buildfire.spinner.show();
          var success = function (result) {
                WidgetHome.allItems = result;
                console.log("----------------", WidgetHome.allItems)
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

        WidgetHome.safeHtml = function (html) {
          if (html)
            return $sce.trustAsHtml(html);
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
          getTimerItems();
          DataStore.get(TAG_NAMES.TIMER_INFO).then(success, error);
        };

        var onUpdateCallback = function (event) {

          setTimeout(function () {
            if (event) {
              console.log("hiiiiiiiiiiiiiiiii",event)
              switch (event.tag) {

                case TAG_NAMES.TIMER_INFO:

                  WidgetHome.data = event.data;
                  if (!WidgetHome.data.design)
                    WidgetHome.data.design = {};
                  if (!WidgetHome.data.content)
                    WidgetHome.data.content = {};
                  break;
                case TAG_NAMES.TIMER_ITEMS:
                 WidgetHome.allItems = $.grep( WidgetHome.allItems, function(e, i){
                    return e.id !== event.id;
                  });
                  break;
              }
              $scope.$digest();
            }
          }, 0);
        };

        WidgetHome.testalert = function(description, id){

       var a= $('.item-carousel span').removeClass('text-primary');
        //  $('#'+id).addClass('text-primary');
          console.log(description);
          WidgetHome.description = description;
        };
        /**
         * DataStore.onUpdate() is bound to listen any changes in datastore
         */
        DataStore.onUpdate().then(null, null, onUpdateCallback);

        init();
      }]);
})(window.angular);