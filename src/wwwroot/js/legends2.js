(function () {
  var svgWidth = 700;
  var svgHeight = 800;
  var svg = d3.select('#timeSeries').append('svg').attr('width', svgWidth).attr('height', svgHeight);
  var colors = ['rgb(0, 0, 0)','rgb(34, 39, 90)',
    'rgb(51, 45, 135)','rgb(69, 48, 192)', 'rgb(46, 44, 213)',
    'rgb(23, 40, 234)','rgb(0, 35, 255)', 'rgb(0, 72, 255)',
    'rgb(0, 108, 255)', 'rgb(0, 146, 255)', 'rgb(0, 182, 255)',
    'rgb(0, 218, 250)', 'rgb(0, 245, 245)', 'rgb(6, 244, 220)',
    'rgb(12,232,195)', 'rgb(18,221,165)', 'rgb(23,210,135)',
    'rgb(29,198,105)', 'rgb(35,187,75)', 'rgb(69,182,58)', 'rgb(104,186,44)',
    'rgb(138,200, 25)', 'rgb(167,214,19)', 'rgb(197,228,13)', 'rgb(226,241,6)',
    'rgb(255,255,0)', 'rgb(255,241,0)', 'rgb(255,227,0)', 'rgb(255,213,0)',
    'rgb(255,199,0)', 'rgb(255,186,0)', 'rgb(255,172,0)', 'rgb(255,159, 0)',
    'rgb(255,145,0)', 'rgb(255,134,0)', 'rgb(255,122,0)', 'rgb(255,103,0)',
    'rgb(255,84,0)'];

  color = d3.scale.ordinal()
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"])
    .domain(d3.range(0,7));

  var translateX = 30.5;
  var translateY = 400.5;
  var legendSize = 300;
  var tickSpacing = legendSize / 8.15;
  var hourBarHeight = 8;

  var timescale = d3.ordinal
    .scale()
    .nice(d3.time.day)
    .domain([new Date(2011, 0, 2), new Date(2011, 0, 1)])
    .range([0, legendSize]);

  var hoursAxis = d3.svg
    .axis()
    .scale(timescale)
    .orient('bottom')
    .ticks(d3.time.hour, 3)
    .tickPadding(6)
    .tickSize(12, 20)
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


  var hoursg = svg.append('g')
    .classed('dayAxis', true)
    .classed('hours', true)
    .classed('labeled', true)
    .attr('transform', 'translate(' + translateX + ',' + translateY + ') rotate(-90)')
    .call(hoursAxis);


  var first = 0;
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
    .attr('width', tickSpacing)
    .attr('height', function () {
      if (first === 0) {
        first++;
        return 0;
      }
      return hourBarHeight;
    });
}());
