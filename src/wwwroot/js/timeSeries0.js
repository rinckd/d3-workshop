(function() {
  var width = 800;
  var height = 400;
  var margins = {
    top: 40,
    right: 20,
    bottom: 40,
    left: 50
  };

  d3.json("/data/hourly_load_profile.json", function (error, json) {
    if (error) return console.error(error);

    var svg = d3.select('#timeSeries')
      .append('svg')
      .attr('height', height)
      .attr('width', width);

    var xScale = d3.scale.linear()
      .range([margins.left, width - margins.right])
      .domain([0,23]);

    var yScale = d3.scale.linear()
      .range([height - margins.bottom, margins.top])
      .domain([0,250]);
    var xAxis = d3.svg.axis()
      .scale(xScale);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

    var lineGenerator = d3.svg.line()
      .x(function(d, iterator) {
        return xScale(iterator);
      })
      .y(function(d) {
        //console.log(d);
        return yScale(d.value);
      })
      .interpolate("basis");
//    .interpolate("linear");
//    .interpolate("cardinal");
//    .interpolate("monotone");

    svg.append('path')
      .attr('d', lineGenerator(json))
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
    svg.append("g")
      .call(xAxis)
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + (height - margins.bottom) + ')');

    svg.append("g")
      .call(yAxis)
      .attr('transform', 'translate(' + (margins.left) + ',0)')
      .attr('class', 'axis');
  });
})();