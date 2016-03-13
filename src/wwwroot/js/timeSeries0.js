(function() {
  'use strict';

  var margin = {
    top: 40,
    right: 0,
    bottom: 40,
    left: 40
  };
  var width = 600 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var svg = d3.select('#time-series')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ','
      + margin.top + ')');

  var yScale = d3.scale.linear()
    .range([height, 0]);
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  var xScale = d3.scale.linear()
    .range([0, width]);
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

  d3.json('/data/timeseries/ac_load.json', function (error, json) {
    if (error) throw error;
    xScale.domain([0,23]);
    yScale.domain(d3.extent(json.data, function(data) {
      return data.value;
    }));
    var lineGenerator = d3.svg.line()
      .x(function(data, iterator) { return xScale(iterator);})
      .y(function(data) { return yScale(data.value);})
      .interpolate('basis');

    svg.append('path')
      .datum(json.data)
      .attr('d', lineGenerator)
      .attr('class', 'line');

    svg.append('g')
      .call(xAxis)
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + height + ')');
    svg.append('g')
      .call(yAxis)
      .attr('class', 'axis');

  })

})();
