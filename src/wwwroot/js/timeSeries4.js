(function () {
  var labelAxis, borderAxis, end, height, hoursAxis, hoursTickSpacing, hoursg, start, svg, timescale, width;
  width = 700;
  height = 800;
  var legendSize = 400;

  var minTime = new Date(2016, 0, 1);
  var maxTime = d3.time.hour.offset(minTime, 24 * 7);

  end = moment().startOf('day');
  start = moment(end).subtract('days', 1);
  timescale = d3.time
    .scale()
    .nice(d3.time.day)
    .domain([end.toDate(), start.toDate()])
    .range([0, legendSize]);

  hoursAxis = d3.svg
    .axis()
    .scale(timescale)
    .orient('bottom')
    .ticks(d3.time.hour, 1)
    .tickPadding(6)
    .tickSize(12)
    .tickFormat(function (d) {
      var hours;
      hours = d.getHours();
      if (hours === 6) {
        return '\uF185';
      } else if (hours === 18) {
        return '\uF186';
      } else {
        return null;
      }
  });

  labelAxis = d3.svg
    .axis()
    .scale(timescale)
    .orient('bottom')
    .ticks(d3.time.hour, 12)
    .tickSize(0)
    .tickPadding(16)
    .tickFormat(function (d) {
      if (d.getHours() === 12) {
        return 'Hours';
      } else {
        return null;
    }
  });
  svg = d3.select('#timeSeries').append('svg').attr('width', width).attr('height', height);
  hoursg = svg.append('g')
    .classed('dayAxis', true)
    .classed('hours', true)
    .classed('labeled', true)
    .attr('transform', 'translate(30.5,400.5) rotate(-90)')
    .call(hoursAxis);

  hoursTickSpacing = timescale(moment(start).add('hours', 1).toDate()) - timescale(start.toDate());
  console.log(hoursTickSpacing);
  var tickSpacing = 16;
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
    .attr('x', 0)
    .attr('width', tickSpacing)
    .attr('height', 8);
  svg.append('g')
    .classed('dayAxis', true)
    .classed('days', true)
    .classed('labeled', true)
    .attr('transform', 'translate(30.5,400.5) rotate(-90)')
    .call(labelAxis);

}());