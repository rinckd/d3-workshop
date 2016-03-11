(function() {
  var svg = d3.select('#time-series')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);
  svg.append('text')
    .attr('x',10)
    .attr('y',20)
    .text('hello world!!');
}());
