(function () {
  'use strict';
  d3.json('data/state_of_charge_percent.json', function (error, jsonFile) {

    if (error) {
      return console.error(error);
    }

    var svgWidth = 600;
    var svgHeight = 400;
    var marginX = 10;
    var marginY = 10;
    var cellWidth = 1.5;
    var cellHeight = 10;

    var matrix = [];
    jsonFile.data.forEach(function(data, it) {
      //console.log(data.date);
      //var format = d3.time.format('%m/%d/%Y %H:%M');
      var format = d3.time.format('%m-%d-%H');
      var d3Date = format.parse(data.date);
      var day = d3.time.dayOfYear(d3Date);
      //var hour = format.parse(data.date).getHours();
      var hour = data.date.substr(6);
      matrix.push({id: day + '-' + hour, x: day, y: hour, weight: data.value});
    });
    //console.log(matrix);

    var maxValue = d3.max(jsonFile.data.map(function(data) { return data.value; }));

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
    //var colorScale = d3.scale.quantize().range(colorbrewer.YlOrRd[8]).domain([0, maxValue]);
    var colorScale = d3.scale.quantize()
      .range(colors)
      .domain([0, maxValue]);

    var svg = d3.select('#heatmap')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);
    svg.append('g')
      .attr('transform', 'translate(' + marginX + ',' +
        marginY +')')
      .selectAll('rect')
      .data(matrix)
      .enter()
      .append('rect')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('x', function (d) {return d.x * cellWidth;})
      .attr('y', function (d) {return d.y * cellHeight;})
      .style('fill', function (d) { return colorScale(d.weight); })
      .on('mouseover', gridOver);

    function gridOver(d) {
      console.log(d);
    }

    var yAxisSize = cellHeight * 24 - 1;
    var timescale = d3.time
      .scale()
      .nice(d3.time.day)
      .domain([new Date(2011, 0, 2), new Date(2011, 0, 1)])
      .range([0, yAxisSize]);

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
        } else if (hours === 12) {
          return '12PM';
        } else if (hours === 21) {
          return '9PM';
        } else {
          return null;
        }
      });

    var translateX = cellWidth * 365 + marginX;
    var translateY = cellHeight * 24 + marginY - 0.5;
    var tickSpacing = yAxisSize / 8.15;
    var hourBarHeight = 4;
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

    var xAxisTranslateX = marginX + 0.5;
    var yAxisTranslateY = cellHeight * 24 + marginY;
    var xAxisLength = 365 * cellWidth - 0.5;
    var xTimeScale = d3.time
      .scale()
      .domain([new Date(2015, 0, 1), new Date(2015, 11, 31)])
      .range([0, xAxisLength]);

    var xAxis = d3.svg
      .axis()
      .scale(xTimeScale)
      .orient('bottom')
      .ticks(d3.time.month, 1)
      .tickPadding(6)
      .tickSize(12, 20)
      .tickFormat(function (d) {
        var month = d.getMonth();
        if (month === 0)
        {
          return null;
        }
        var formatDate = d3.time.format('%b');
        return formatDate(d);
      });

    var xAxisg = svg.append('g')
      .classed('dayAxis', true)
      .classed('hours', true)
      .classed('labeled', true)
      .attr('transform', 'translate(' + xAxisTranslateX + ',' + yAxisTranslateY + ') rotate(0)')
      .call(xAxis);
  });
})();
