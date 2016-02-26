(function () {
  'use strict';
  var svgWidth = 700;
  var svgHeight = 800;
  var svg = d3.select('#timeSeries').append('svg').attr('width', svgWidth).attr('height', svgHeight);

  var xAxisTranslateX = 30.5;
  var yAxisTranslateY = 400.5;
  var xAxisLength = 500;
  var timescale = d3.time
    .scale()
    .domain([new Date(2015, 0, 1), new Date(2015, 11, 31)])
    .range([0, xAxisLength]);

  var xAxis = d3.svg
    .axis()
    .scale(timescale)
    .orient('bottom')
    .ticks(d3.time.month, 1)
    .tickPadding(6)
    .tickSize(12, 20)
    .tickFormat(function (d) {
      var month = d.getMonth();
      if (month === 0) {
        return null;
      }
      var formatDate = d3.time.format('%b');
      return formatDate(d);
    });

  svg.append('g')
    .classed('dayAxis', true)
    .classed('hours', true)
    .classed('labeled', true)
    .attr('transform', 'translate(' + xAxisTranslateX + ',' + yAxisTranslateY + ') rotate(0)')
    .call(xAxis);

}());
