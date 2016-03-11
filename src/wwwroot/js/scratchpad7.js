(function() {
  var svg = d3.select('#time-series')
    .append('svg')
    .attr('width', 700)
    .attr('height', 700);

  var path = svg.append('path')
    .attr('d', 'M 100 100 L300 100 L200 300z')
    .attr('class', 'triangle');

}());
