(function () {
  var daysLabelsAxis, daysTickmarksAxis, end, height, hoursAxis, hoursTickSpacing, hoursg, start, svg, timescale, width;
  width = 700;
  height = 100;

  end = moment().startOf('day');
  start = moment(end).subtract('days', 7);
  timescale = d3.time.scale().nice(d3.time.day).domain([
    start.toDate(),
    end.toDate()
  ]).range([
    0,
    width - 1
  ]);
  hoursAxis = d3.svg.axis().scale(timescale).orient('bottom').ticks(d3.time.hour, 3).tickPadding(6).tickSize(8).tickFormat(function (d) {
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
  daysTickmarksAxis = d3.svg.axis().scale(timescale).orient('bottom').ticks(d3.time.day, 1).tickFormat('').tickSize(30).tickPadding(6);
  daysLabelsAxis = d3.svg.axis().scale(timescale).orient('bottom').ticks(d3.time.hour, 12).tickSize(0).tickPadding(36).tickFormat(function (d) {
    var formatter;
    if (d.getHours() === 12) {
      if (d.getDate() === 1 || moment(d).isSame(start, 'day')) {
        formatter = d3.time.format.utc('%a %d %b');
      } else {
        formatter = d3.time.format.utc('%a %d');
      }
      return formatter(d);
    } else {
      return null;
    }
  });
  svg = d3.select('#timeSeries').append('svg').attr('width', width).attr('height', height);
  hoursg = svg.append('g').classed('axis', true).classed('hours', true).classed('labeled', true).attr('transform', 'translate(0.5,0.5)').call(hoursAxis);
  hoursTickSpacing = timescale(moment(start).add('hours', 3).toDate()) - timescale(start.toDate());
  hoursg.selectAll('g.tick').insert('rect', ':first-child').attr('class', function (d, i) {
    var hours;
    hours = d.getHours();
    if (hours < 6 || hours >= 18) {
      return 'nighttime';
    } else {
      return 'daytime';
    }
  }).attr('x', 0).attr('width', hoursTickSpacing).attr('height', 4);
  svg.append('g').classed('axis', true).classed('days', true).attr('transform', 'translate(0.5,0.5)').call(daysTickmarksAxis);
  svg.append('g').classed('axis', true).classed('days', true).classed('labeled', true).attr('transform', 'translate(0.5,0.5)').call(daysLabelsAxis);

}());