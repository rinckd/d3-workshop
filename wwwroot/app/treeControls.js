(function() {
  "use strict";
  angular.module('app')
    .directive("placeTree", placeTree);
    
  function placeTree() {
    function link(scope, element, attr) {
      scope.$watch('data', function(newValue){
        if (newValue) {
          var result = {};
          for (var i = 0; i < newValue.length; i++)
          {
            result[newValue[i].key] = newValue[i].value;
          }
          maxDepth = result['maxDepth'];
          console.log(result);
          console.log(maxDepth);
        }
      }, true);
      
      scope.$watch('buttonControl', function (newValue) {
        if (newValue) {
          console.log("hello!");          
        }
      }, true);
      
      console.log(scope);
      console.log(scope.data[0]);
      console.log()
      var maxDepth = 5;
      var branches = [];
      var initialLength = 100;
      var baseXPoint = 240;
      var baseYPoint = 500;

      // make sliders from these:
      var successiveBranchLengthRatio = 0.8;
      var theta = 0.5;
      var opacity = -1.4;
      var trunk = {
        depth: 0,
        x1: baseXPoint,
        y1: baseYPoint,
        x2: baseXPoint,
        y2: baseYPoint - initialLength,
        angle: 0,
        length: initialLength * successiveBranchLengthRatio
      };

      function branchTree(branch) {
        branches.push(branch);
        if (branch.depth === maxDepth) {
          return;
        }
        var leftBranch = {
          x1: branch.x2,
          y1: branch.y2,
          x2: branch.x2 + branch.length * Math.sin(branch.angle),
          y2: branch.y2 - branch.length * Math.cos(branch.angle),
          angle: branch.angle - theta,
          length: branch.length * successiveBranchLengthRatio,
          depth: branch.depth + 1,
        };
        branchTree(leftBranch);

        var rightBranch = {
          x1: branch.x2,
          y1: branch.y2,
          x2: branch.x2 + branch.length * Math.sin(branch.angle),
          y2: branch.y2 - branch.length * Math.cos(branch.angle),
          angle: branch.angle + theta,
          length: branch.length * successiveBranchLengthRatio,
          depth: branch.depth + 1,
        };
        branchTree(rightBranch);
      }
      function update() {
        
        branchTree(trunk);
        d3.select('svg')
          .selectAll('line')
          .data(branches)
          .transition()
          .style('stroke', '#ffffff')
          .attr('x1', function (d) { return d.x1; })
          .attr('y1', function (d) { return d.y1; })
          .attr('x2', function (d) { return d.x2; })
          .attr('y2', function (d) { return d.y2; })
          .style('stroke-opacity', function (d) { return (maxDepth + opacity - d.depth) * 0.1; })
          .style('stroke-width', function (d) { return ((maxDepth + 1 - d.depth) * 0.4) + 'px'; });
        
      }
      function create() {
        //var svg = d3.select('#treeBackground').append('svg')
        var svg = d3.select(element[0]).append('svg')
          .attr('width', 600)
          .attr('height', 500);
        
        branchTree(trunk);
        
        svg.selectAll('line')
          .data(branches)
          .enter()
          .append('line')
          .style('stroke', '#ffffff')
          .attr('x1', function (d) { return d.x1; })
          .attr('y1', function (d) { return d.y1; })
          .attr('x2', function (d) { return d.x2; })
          .attr('y2', function (d) { return d.y2; })
          .style('stroke-opacity', function (d) { return (maxDepth + opacity - d.depth) * 0.1; })
          .style('stroke-width', function (d) { return ((maxDepth + 1 - d.depth) * 0.4) + 'px'; });
      }
        
      create();
    }
    return {
      link: link,
      restrict: 'E',
      controller: 'sliderController',
      scope: { data: "=", buttonControl: '=' }
    };
  }
})();