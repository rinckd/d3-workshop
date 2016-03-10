(function() {
  'use strict';

  var width = 600;
  var height = 400;
  var margins = {
    top: 40,
    right: 0,
    bottom: 40,
    left: 50
  };

  d3.json('/data/timeseries/ac_load.json', function (error, json) {
    if (error) {
      return console.error(error);
    }

    var svg = d3.select('#time-series')
      .append('svg')
      .attr('height', height)
      .attr('width', width);


    var yScale = d3.scale.linear()
      .range([height - margins.bottom, margins.top])
      .domain([0, 300]);



    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');


    var xScale = d3.scale.linear()
      .range([margins.left, width - margins.right])
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
      .attr('transform', 'translate(0, ' + (height - margins.bottom) + ')');

    svg.append('g')
      .call(yAxis)
      .attr('transform', 'translate(' + (margins.left) + ',0)')
      .attr('class', 'axis');

    var title = json.title + ' (' + json.units + ')';
    svg.append('text')
      .attr('x', 300)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('class', 'mdl-card__title-text')
      .text(title);

  });
})();
