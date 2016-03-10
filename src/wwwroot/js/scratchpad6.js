(function() {
  var pointData = [
    {
      'x':205,
      'y':110
    },
    {
      'x':125,
      'y':160
    },
    {
      'x':125,
      'y':250
    },
    {
      'x':200,
      'y':290
    },
    {
      'x':275,
      'y':250
    },
    {
      'x':275,
      'y':160
    },
    {
      'x':195,
      'y':110
    }
  ];
  var svg = d3.select('#time-series')
    .append('svg')
    .attr('width', 1000)
    .attr('height', 1000);

  var line = d3.svg.line()
    .interpolate('linear')
    .x(function(d) { return d.x;})
    .y(function(d) { return d.y;});

  var path = svg.append('path')
    .attr('d', line(pointData))
    .attr('stroke-width', 22)
    .attr('stroke', 'rgb(47,54,169')
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
