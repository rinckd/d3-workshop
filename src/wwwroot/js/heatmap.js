(function () {
  'use strict';

  var svgWidth = 600;
  var svgHeight = 310;
  var legendHeight = 50;
  var svg = d3.select('#heatmap')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);
  var legendSVG = d3.select('#legend')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', legendHeight);
  var url = '';

  d3.json('/dataset', function(error, jsonDataSets) {
    var dropDown = d3.select("#heatmap-selection")
      .append("select")
      .attr('class', 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label');
    var optionList = dropDown.selectAll("option")
      .data(jsonDataSets)
      .enter()
      .append("option")
      .attr("value",function(d) { return d.value; })
      .text(function(d) { return d.key; });
    if (jsonDataSets.length > 0) {
      url = jsonDataSets[0].value;
      d3.json(url, callback);
    }
  });

  var alertChange = function() {
    var selectedValue = d3.event.target.value;
    //var selectedIndex = d3.event.target.selectedIndex;
    url = selectedValue;
    d3.select('#heatmap')
      .select('svg').remove();
    svg = d3.select('#heatmap')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);
    d3.select('#legend')
      .select('svg').remove();
    legendSVG = d3.select('#legend')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', legendHeight);
    d3.json(url, callback);
  };
  d3.select("#heatmap-selection").on("change", alertChange);


  var callback = function (error, jsonFile) {
    if (error) {
      return console.error(error);
    }
    d3.json('data/colors/magma.json', function(error, jsonColorPalette) {
      var legendColorWidth = 1.5;
      var marginX = 10;
      var marginY = 30;
      var cellWidth = 1.5;
      var cellHeight = 10;
      var matrix = [];

      jsonFile.data.forEach(function (data, it) {
        //console.log(data.date);
        var format = d3.time.format('%m/%d/%Y %H:%M');
        //var format = d3.time.format('%m-%d-%H');
        var d3Date = format.parse(data.date);
        var day = d3.time.dayOfYear(d3Date);
        //var hour = format.parse(data.date).getHours();
        var hour = data.date.substr(11, 2);
        matrix.push({id: day + '-' + hour, x: day, y: hour, weight: data.value});
      });
      //console.log(matrix);
      var maxValue = d3.max(jsonFile.data.map(function (data) {
        return data.value;
      }));
      var colorScale = d3.scale.quantize()
        .range(jsonColorPalette.colors)
        .domain([0, maxValue]);

      svg.append('g')
        .attr('transform', 'translate(' + marginX + ',' +
          marginY + ')')
        .selectAll('rect')
        .data(matrix)
        .enter()
        .append('rect')
        .attr('width', cellWidth)
        .attr('height', cellHeight)
        .attr('x', function (d) {
          return d.x * cellWidth;
        })
        .attr('y', function (d) {
          return d.y * cellHeight;
        })
        .style('fill', function (d) {
          return colorScale(d.weight);
        })
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
          if (month === 0) {
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

      var title = jsonFile.title;
      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'mdl-card__title-text')
        .attr('x', 300)
        .attr('y', 20)
        .text(title);


      var legendSize = jsonColorPalette.colors.length * legendColorWidth;
      legendSVG.selectAll('rect')
        .data(jsonColorPalette.colors)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
          return 30 + legendColorWidth * i;
        })
        .attr('y', 20)
        .attr('width', legendColorWidth)
        .attr('height', 10)
        .attr('fill', function (d) {
          return d;
        });

      var legendScale = d3.scale.linear()
        .domain([0, maxValue])
        .range([0, legendSize]);

      var legendAxis = d3.svg
        .axis()
        .scale(legendScale)
        .orient('bottom')
        .tickSize(12);

      var legendAxisg = legendSVG.append('g')
        .attr('transform', 'translate(' + 30 + ',' + 20 + ') rotate(0)')
        .attr('class', 'axis')
        .call(legendAxis);

      legendSVG.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (30 + (legendSize / 2)) + "," + 15 + ")")
        .text(jsonFile.units);
    });
  };
})();
