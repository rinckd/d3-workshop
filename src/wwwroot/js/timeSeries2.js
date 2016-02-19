(function() {

  var margin = {top: 10, right: 10, bottom: 100, left: 40},
    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

  var parseDate = d3.time.format('%m-%d-%H').parse;

  var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(20).tickSize(16,0).tickFormat(d3.time.format('%B-%d')),
    xAxis2 = d3.svg.axis().scale(x2).orient('bottom').ticks(d3.time.months).tickSize(16,0).tickFormat(d3.time.format('%B')),
    yAxis = d3.svg.axis().scale(y).orient('left');

  var brush = d3.svg.brush()
    .x(x2)
    .on('brush', brushed);

  var area = d3.svg.area()
    .interpolate('basis')
    .x(function(d) { return x(parseDate(d.date)); })
    .y0(height)
    .y1(function(d) { return y(d.value); });

  var area2 = d3.svg.area()
    .interpolate('basis')
    .x(function(d) { return x(parseDate(d.date)); })
    .y0(height2)
    .y1(function(d) { return y2(d.value); });

  var svg = d3.select('#timeSeries').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom + 100);

  svg.append('defs').append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height);

  var focus = svg.append('g')
    .attr('class', 'focus')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var context = svg.append('g')
    .attr('class', 'context')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

  d3.json('/data/hourly_load_profile.json', function(error, data) {

    x.domain(d3.extent(data.map(function(d) { return parseDate(d.date); })));
    y.domain([0, d3.max(data.map(function(d) { return d.value; }))]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area);

    focus.append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    focus.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    context.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area2);

    context.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(xAxis2);

    context.append('g')
      .attr('class', 'x brush')
      .call(brush)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', height2 + 7);
  });

  var xAxisUpdate = d3.svg
    .axis()
    .scale(x)
    .orient('bottom')
    .ticks(20)
    .tickSize(16,0)
    .tickFormat(d3.time.format('%B-%d'));

  function brushed() {
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    focus.select('.area').attr('d', area);
    focus.select('.xAxis').call(xAxisUpdate);
  }
})();