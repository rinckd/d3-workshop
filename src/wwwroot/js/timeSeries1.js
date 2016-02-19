(function() {
  var width = 800;
  var height = 400;
  var margins = {
    top: 40,
    right: 0,
    bottom: 40,
    left: 50
  };

  d3.json('/data/hourly_load_profile.json', function (error, json) {
    if (error) {
      return console.error(error);
    }

    var svg = d3.select('#timeSeries')
      .append('svg')
      .attr('height', height)
      .attr('width', width);

    var format = d3.time.format('%m-%d-%H');
    var minDate = format.parse('01-01-00'); // returns a Date
    var maxDate = format.parse('01-02-02');

    var xScale = d3.time.scale()
      .domain([minDate, maxDate])    // values between for month of january
      .range([margins.left, width - margins.right]);   // map these the the chart width = total width minus padding at both sides

    var yScale = d3.scale.linear()
      .range([height - margins.bottom, margins.top])
      .domain([0, 250]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .tickFormat(d3.time.format('%_I%p'));

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

    var lineGenerator = d3.svg.line()
      .x(function(d) {
        return xScale(format.parse(d.date));
      })
      .y(function(d) {
        return yScale(d.value);
      })
      .interpolate('basis');

    svg.append('path')
      .attr('d', lineGenerator(json))
      .attr('stroke', 'green')
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

  });

})();