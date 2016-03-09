(function () {
  'use strict';
  var svgWidth = 700;
  var svgHeight = 800;
  var svg = d3.select('#time-series').append('svg').attr('width', svgWidth).attr('height', svgHeight);

  var translateX = 30.5;
  var translateY = 400.5;
  var legendSize = 300;
  var tickSpacing = legendSize / 8.15;
  var hourBarHeight = 8;

  var timescale = d3.time
    .scale()
    .nice(d3.time.day)
    .domain([new Date(2011, 0, 2), new Date(2011, 0, 1)])
    .range([0, legendSize]);

  var hoursAxis = d3.svg
    .axis()
    .scale(timescale)
    .orient('bottom')
    .ticks(d3.time.hour, 3)
    .tickPadding(6)
    .tickSize(12, 20)
    .tickFormat(function (d) {
      var hours = d.getHours();
      if (hours === 6) {
        return '\uF185';
      } else if (hours === 18) {
        return '\uF186';
      } else if (hours === 3) {
        return '3AM';
      } else if (hours === 9) {
        return '9AM';
      } else if (hours === 12) {
        return '12PM';
      } else if (hours === 15) {
        return '3PM';
      } else if (hours === 21) {
        return '9PM';
      } else {
        return null;
      }
    });

  var hoursg = svg.append('g')
    .classed('dayAxis', true)
    .classed('hours', true)
    .classed('labeled', true)
    .attr('transform', 'translate(' + translateX + ',' + translateY + ') rotate(-90)')
    .call(hoursAxis);

  var first = 0;
  hoursg.selectAll('g.tick')
    .insert('rect', ':first-child')
    .attr('class', function (d) {
      var hours = d.getHours();
      if (hours <= 6 || hours > 18) {
        return 'nighttime';
      } else {
        return 'daytime';
      }
    })
    .attr('width', tickSpacing)
    .attr('height', function () {
      if (first === 0) {
        first++;
        return 0;
      }
      return hourBarHeight;
    });
}());
