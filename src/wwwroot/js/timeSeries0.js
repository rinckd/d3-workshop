(function() {
  'use strict';

  var margin = {
    top: 40,
    right: 10,
    bottom: 40,
    left: 40
  };
  var width = 600 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  d3.json('/data/timeseries/ac_load.json', function (error, json) {
    if (error) {
      return console.error(error);
    }

    var svg = d3.select('#time-series')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var yScale = d3.scale.linear()
      .range([height, 0])
      .domain([0, 300]);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

    var xScale = d3.scale.linear()
      .range([0, width])
      .domain([0,23]);

    var xAxis = d3.svg.axis()
      .scale(xScale);

    var lineGenerator = d3.svg.line()
      .x(function(d, iterator) { return xScale(iterator); })
      .y(function(d) {
        //console.log(d);
        return yScale(d.value);
      })
      .interpolate('basis'); // ('linear')('cardinal')('monotone');

    svg.append('path')
      .attr('d', lineGenerator(json.data))
      .attr('stroke', '#3f51b5')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
    svg.append('g')
      .call(xAxis)
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + height  + ')');

    svg.append('g')
      .call(yAxis)
      .attr('class', 'axis');

    var title = json.title + ' (' + json.units + ')';
    svg.append('text')
      .attr('x', (width + margin.left + margin.right)/2 )
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('class', 'mdl-typography--headline')
      .text(title);
  });
})();
