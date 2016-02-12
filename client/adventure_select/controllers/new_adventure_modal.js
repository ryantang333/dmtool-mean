'use strict';

angular.module('app').controller('NewAdventureModalCtrl', ["$scope", "$uibModal", function ($scope, $uibModal) {
  $scope.open = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'new_adventure_modal.html',
      controller: 'NewAdventureModalInstanceCtrl'
    });
  };
}]);

angular.module('app').controller('NewAdventureModalInstanceCtrl', ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
  $scope.ok = function () {
    $uibModalInstance.close();
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);