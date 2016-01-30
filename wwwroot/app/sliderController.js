(function () {
  'use strict';
  angular.module('app')
    .controller('sliderController', sliderController);
  
  // function sliderController() {
    
  // }  
  function sliderController($scope) {
    var vm = this;
    vm.message = 'hello world';
    $scope.parameters = {
      maxDepth: '11',
      opacity: '20'
    };
    
    $scope.update = function() {
      console.log("controller");
      $scope.updateTree +=1;
      $scope.buttonControl = 1;
    }
 }
})();