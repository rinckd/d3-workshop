(function () {
  const width = 700;
  const height = 800;
  var start = true;

  var svg = d3.select('#timeSeries')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var path = svg.append('svg:path')
    .attr('d','M100 100 L300 100 L200 300z')
    .style('stroke-width', 2)
    .style('stroke', 'steelblue')
    .style('fill', 'none');

  var totalLength = path.node().getTotalLength();

  path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
    .attr('stroke-dashoffset', totalLength)
    .transition()
    .duration(2000)
    .ease('linear')
    .attr('stroke-dashoffset', 0);

  svg.on('click', function() {
    if (start) {
      start = false;
      path.transition()
        .duration(2000)
        .ease('linear')
        .attr('stroke-dashoffset', totalLength);
    } else {
      start = true;
      path.transition()
        .duration(2000)
        .ease('linear')
        .attr('stroke-dashoffset', 0);
    }
  });

}());
