(function () {
  'use strict';
  const width = 700;
  const height = 800;

  var svg = d3.select('#time-series')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  svg.append('text')
    .attr('x', 10)
    .attr('y', 20)
    .text('hello world');
}());
