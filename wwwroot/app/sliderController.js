(function () {
  'use strict';
  angular.module('app')
    .controller('sliderController', sliderController);
  
  // function sliderController() {
    
  // }  
  function sliderController($scope) {
    $scope.parameters =[{key:'maxDepth', value:'11'},{key:'something', value:'20'}];
    
    $scope.update = function() {
      console.log("controller");
      $scope.updateTree +=1;
      $scope.buttonControl = 1;
    }
 }
})();