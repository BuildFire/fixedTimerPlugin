'use strict';

(function (angular) {
  angular
    .module('fixedTimerPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', '$rootScope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', '$sce','$timeout',
      function ($scope, $rootScope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, $sce, $timeout) {
        var WidgetHome = this;
        WidgetHome.data = null;
        WidgetHome.busy = false;
        WidgetHome.allItems={};
        WidgetHome.isCounterNegative = false;
        WidgetHome.timerRunning = "stop";
        WidgetHome.counter = 5;
          WidgetHome.stopped = false;
          WidgetHome.stoppedPlus =false;
          WidgetHome.countdown = function(){
              WidgetHome.timerRunning = "start";
              if(!WidgetHome.isCounterNegative){
                  WidgetHome.countdownNeg();
              }
              else {
                  WidgetHome.countdownPlus();
              }
          };

          WidgetHome.countdownNeg = function() {
              WidgetHome.stopped = $timeout(function() {
                  console.log($scope.counter);
                  WidgetHome.counter--;
                  if( WidgetHome.counter==0){
                      WidgetHome.isCounterNegative = true;
                      WidgetHome.countdownPlus();
                      return;
                  }
                  WidgetHome.countdownNeg();
              }, 1000);
            };

          WidgetHome.countdownPlus = function() {
               WidgetHome.stoppedPlus = $timeout(function() {
                  console.log(WidgetHome.counter);
                  WidgetHome.counter++;
                  WidgetHome.countdownPlus();
              }, 1000);
           };

          WidgetHome.stop = function(){
              WidgetHome.timerRunning = "pause";
              if(WidgetHome.isCounterNegative)
                  $timeout.cancel(WidgetHome.stoppedPlus);
              else
                  $timeout.cancel(WidgetHome.stopped);
          };

          WidgetHome.resetTimer = function(){
              WidgetHome.stop();
              WidgetHome.timerRunning = "stop";
              WidgetHome.isCounterNegative = false;
              WidgetHome.counter =  WidgetHome.counterSetTime;
          };

        var getTimerItems = function () {
          Buildfire.spinner.show();
          var success = function (result) {
                WidgetHome.allItems = result;
                console.log("----------------", WidgetHome.allItems)
                WidgetHome.selectTimer(WidgetHome.allItems[0].data.data);
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

          /*declare the device width heights*/
          $rootScope.deviceHeight = window.innerHeight;
          $rootScope.deviceWidth = window.innerWidth;
          $rootScope.backgroundImage = "";

            var success = function (result) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.content)
                WidgetHome.data.content = {};
              if (!WidgetHome.data.design)
                WidgetHome.data.design = {};
              $rootScope.backgroundImage = WidgetHome.data.design.backgroundImage ? WidgetHome.data.design.backgroundImage : "";
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
              switch (event.tag) {
                case TAG_NAMES.TIMER_INFO:
                  WidgetHome.data = event.data;
                  if (!WidgetHome.data.design)
                    WidgetHome.data.design = {};
                  if (!WidgetHome.data.content)
                    WidgetHome.data.content = {};
                    if (!event.data.design.backgroundImage) {
                        $rootScope.backgroundImage = ""
                    } else {
                        $rootScope.backgroundImage = event.data.design.backgroundImage;
                    }
                  break;
                case TAG_NAMES.TIMER_ITEMS:
                 WidgetHome.allItems = $.grep( WidgetHome.allItems, function(e, i){
                    return e.id !== event.id;
                  });
                    WidgetHome.selectTimer(WidgetHome.allItems[0].data.data);
                  break;
              }
              $rootScope.$digest();
            }
          }, 0);
        };

        WidgetHome.covertToMS = function(data){

            if(!data.hrs){
                data.hrs = 0;
            }
            else{
                data.hrs =Number(data.hrs)
            }
            if(!data.min){
                data.min = 0;
            }
            else{
                data.min =Number(data.min)
            }
            if(!data.sec){
                data.sec = 0;
            }
            else{
                data.sec =Number(data.sec)
            }
            console.log(data)
            var timeInMS = data.hrs*3600+data.min*60+data.sec
                return timeInMS;
        }
        WidgetHome.selectTimer = function(data){
          console.log(WidgetHome.counter)
          WidgetHome.description = data.description;
          WidgetHome.counterSetTime = WidgetHome.covertToMS(data.timer);
          WidgetHome.counter = WidgetHome.covertToMS(data.timer);
        };
        /**
         * DataStore.onUpdate() is bound to listen any changes in datastore
         */
        DataStore.onUpdate().then(null, null, onUpdateCallback);

        init();
      }]);
})(window.angular);