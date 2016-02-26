(function() {
  'use strict';
  const width = 700;
  const height = 800;
  var start = true;

  var svg = d3.select('#timeSeries')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var path = svg.append('svg:path')
    .attr('d', 'M 0,300 A 200,200 0 0,1 400,300')
    .attr('id', 'arc')
    .style('stroke-width', 2)
    .style('stroke', 'steelblue')
    .style('fill', 'none');

  svg.append('text')
    .append('textPath')
    .attr('xlink:href', '#arc')
    .style('text-anchor', 'middle')
    .attr('startOffset', '50%')
    .text('data driven documents')
    .each(repeat);

  function repeat() {
    svg.selectAll('path')
      .transition().duration(2000)
      .delay(500)
      .attr('d', 'M75,300 A125,125 0 0,1 325,300')
      .transition().duration(2000)
      .attr('d', 'M 0,300 A 200,200 0 0,1 400,300')
      .each('end', repeat);
  }

}());






