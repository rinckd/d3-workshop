(function () {
  var svgWidth = 700;
  var svgHeight = 800;
  var labelAxis, borderAxis, hoursAxis, hoursTickSpacing, hoursg, svg, timescale;
  var legendSize = 400;

  var end = new Date(2011, 0, 2);
  var start = new Date(2011, 0, 1);

  timescale = d3.time
    .scale()
    .nice(d3.time.day)
    .domain([end, start])
    .range([0, legendSize]);

  hoursAxis = d3.svg
    .axis()
    .scale(timescale)
    .orient('bottom')
    .ticks(d3.time.hour, 1)
    .tickPadding(6)
    .tickSize(12)
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

  svg = d3.select('#timeSeries').append('svg').attr('width', svgWidth).attr('height', svgHeight);
  hoursg = svg.append('g')
    .classed('dayAxis', true)
    .classed('hours', true)
    .classed('labeled', true)
    .attr('transform', 'translate(30.5,500.5) rotate(-90)')
    .call(hoursAxis);

  //hoursTickSpacing = timescale(moment(start).add('hours', 1).toDate()) - timescale(start.toDate());
  //console.log(hoursTickSpacing);
  var tickSpacing = 16;
  hoursg.selectAll('g.tick')
    .insert('rect', ':first-child')
    .attr('class', function (d) {
      var hours = d.getHours();
      if (hours == 0)
      {
        return null;
      } else if (hours <= 6 || hours > 18) {
        return 'nighttime';
      } else {
        return 'daytime';
      }
    })
    .attr('x', 0)
    .attr('width', tickSpacing)
    .attr('height', function (d) {
      var day = d.getDay();
      console.log(day);
      if (day !== 6) {
        return 0;
      } else {
        return 8;
      }
    });

}());