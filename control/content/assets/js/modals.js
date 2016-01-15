(function (angular, buildfire) {
    'use strict';
    if (!buildfire) {
        throw ("buildfire not found");
    }
    angular
        .module('timerModals', ['ui.bootstrap'])
        .factory('Modals', ['$modal', '$q', function ($modal, $q) {
            return {
                removePopupModal: function (info) {
                    var removePopupDeferred = $q.defer();
                    var removePopupModal = $modal
                        .open({
                            templateUrl: 'templates/modals/remove-item.html',
                            controller: 'RemovePopupCtrl',
                            controllerAs: 'RemovePopup',
                            size: 'sm',
                            resolve: {
                                Info: function () {
                                    return info;
                                }
                            }
                        });
                    removePopupModal.result.then(function (imageInfo) {
                        removePopupDeferred.resolve(imageInfo);
                    }, function (err) {
                        //do something on cancel
                        removePopupDeferred.reject(err);
                    });
                    return removePopupDeferred.promise;
                }
            };
        }])
        .controller('RemovePopupCtrl', ['$scope', '$modalInstance', 'Info', function ($scope, $modalInstance, Info) {
            console.log('RemovePopup Controller called-----');
            $scope.value=Info.name;
            $scope.ok = function () {
                $modalInstance.close('yes');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('no');
            };
        }])
})(window.angular, window.buildfire);
