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
  d3.json('/data/ac_load.json', function(error, json) {
    var svg = d3.select('#timeSeries')
      .append('svg')
      .attr('height', height)
      .attr('width', width);

    //var yScale = d3.scale.linear()
    //  .range([height - margins.bottom, margins.top])
    //  .domain([0, d3.max(json.data.map(function(data) { return data.value; }))]);

    var yScale = d3.scale.linear()
      .range([height - margins.bottom, margins.top])
      .domain([0, d3.max(json.data, function(d) { return d.value; })]);


    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

    svg.append('g')
      .call(yAxis)
      .attr('transform', 'translate(' + (margins.left) + ',0)')
      .attr('class', 'axis');

    var xScale = d3.scale.linear()
      .range([margins.left, width - margins.right])
      .domain([0,23]);

    var xAxis = d3.svg.axis()
      .scale(xScale);

    svg.append('g')
      .call(xAxis)
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + (height - margins.bottom) + ')');

    var rr = [1,2,3, 4];

    var lineGenerator = d3.svg.line()
      .x(function(d, it) { return xScale(it);})
      .y(function(d) { return yScale(d.value);})
      .interpolate('basis');

    svg.append('path')
      .attr('d', lineGenerator(rr))
      .attr('fill', 'none')
      .attr('stroke', '#3f51b5')
      .attr('stroke-width', 2);




  })

})();
