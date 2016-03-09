(function() {

  var pointData = [
    [205, 110],
    [125, 160],
    [125, 250],
    [200, 290],
    [275, 250],
    [275, 160],
    [195, 110]
  ];
  var svg = d3.select('#time-series')
    .append('svg')
    .attr('width', 1000)
    .attr('height', 1000);

  var line = d3.svg.line()
    .interpolate('linear')
    .x(function(d) { return d[0];})
    .y(function(d) { return d[1];});

  var path = svg.append('path')
    .attr('d', line(pointData))
    .attr('stroke', 'rgb(47,54,169')
    .attr('stroke-width', 22)
    .attr('fill', 'none');

  var totalLength = path.node().getTotalLength();
  function forwards() {
    path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(4000)
      .ease('linear')
      .attr('stroke-dashoffset', 0)
      .each('end', backwards);
  }
  function backwards() {
    path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', 0)
      .transition()
      .duration(4000)
      .ease('linear')
      .attr('stroke-dashoffset', totalLength)
      .each('end', forwards);
  }
  forwards();

}());
