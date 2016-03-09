(function() {
  'use strict';
  const width = 700;
  const height = 800;

  var svg = d3.select('#time-series')
    .append('svg')
    .attr('width', 700)
    .attr('height', 700);

  var path = svg.append('svg:path')
    .attr('d', 'M 100 100 L300 100 L200 300z')
    .attr('id', 'arc')
    .style('stroke-width', 22)
    .style('stroke', 'steelblue')
    .style('fill', 'none');


}());






