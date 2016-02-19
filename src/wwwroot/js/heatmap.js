(function () {
  d3.json('data/hourly_load_profile.json', function (error, jsonFile) {
    if (error) {
      return console.error(error);
    }

    var cellWidth = 1.5;
    var heatmapWidth = cellWidth * 365;
    var cellHeight = 7;

    var translateX = 597;
    var translateY = 217.5;
    var legendSize = 167;
    var tickSpacing = legendSize / 8.15;
    var hourBarHeight = 4;


    var matrix = [];
    jsonFile.forEach(function(data, it) {
      var format = d3.time.format('%m-%d-%H');
      var d3Date = format.parse(data.date);
      var day = d3.time.dayOfYear(d3Date);
      var hour = format.parse(data.date).getHours();
      matrix.push({id: day + '-' + hour, x: day, y: hour, weight: data.value});
      });

    var maxValue = d3.max(jsonFile.map(function(data) { return data.value; }));
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
      .attr('width', 800)
      .attr('height', 300);
    svg.append('g')
      .attr('transform', 'translate(50,50)')
      .attr('id', 'adjacencyG')
      .selectAll('rect')
      .data(matrix)
      .enter()
      .append('rect')
      .attr('width', 1.5)
      .attr('height', 7)
      .attr('x', function (d) {return d.x * cellWidth;})
      .attr('y', function (d) {return d.y * cellHeight;})
      .style('stroke', 'black')
      .style('stroke-width', 0)
      .style('fill', function (d) { return colorScale(d.weight); })
      .style('fill-opacity', function (d) {return d.weight * 0.2;})
      .on('mouseover', gridOver);

    var testColorScale = d3.scale.ordinal()
      .domain(matrix.map(function (d) {return colorScale(d.weight); }))
      .rangeRoundBands([0, 800], 1);
    var testAxis = d3.svg.axis().scale(testColorScale).orient("bottom");

    svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(780,50)');

    var legend = d3.legend.color()
      .scale(colorScale)
      .cells([0.1, 5, 10, 50])
      .labels('');

    svg.select('.legend')
      .call(legend);

    function gridOver(d) {
      console.log(d);
      d3.selectAll('rect').style('stroke-width', function (p) {return p.x === d.x && p.y === d.y ? '1px' : '0px';});
    }

    var timescale = d3.time
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
        } else if (hours === 12) {
          return '12PM';
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


    var xAxisTranslateX = 50.5;
    var yAxisTranslateY = 217;
    var xAxisLength = 547;
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
        var formatDate = d3.time.format("%b");
        return formatDate(d);
      });


    var xAxisg = svg.append('g')
      .classed('dayAxis', true)
      .classed('hours', true)
      .classed('labeled', true)
      .attr('transform', 'translate(' + xAxisTranslateX + ',' + yAxisTranslateY + ') rotate(0)')
      .call(xAxis);

    svg.append("g")
      .attr("class", "Testaxis")
      .attr("transform", "translate(0," + 0 + ")")
      .call(testAxis);

    svg.selectAll("circle")
      .data( testAxis )
      .enter()
      .append("circle")
      .attr("r", 18 )
      .attr("cx", d3.scale.linear().domain([-1, 10]).range([0, 400]) )
      .attr("cy", 25)
      .attr("fill", testAxis );
  });
})();
