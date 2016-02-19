(function () {
  d3.json('data/hourly_load_profile.json', function (error, jsonFile) {
    if (error) {
      return console.error(error);
    }
    var matrix = [];
    jsonFile.forEach(function(data, it) {
      var format = d3.time.format('%m-%d-%H');
      var d3_date = format.parse(data.date);
      var day = d3.time.dayOfYear(d3_date);
      var hour = format.parse(data.date).getHours();
      //var i = d3.time.dayOfYear(format.parse(data.date));
      //var j = format.parse(data.date).getHours();
      matrix.push({id: day + '-' + hour, x: day, y: hour, weight: data.value});
      });

    var maxValue = d3.max(jsonFile.map(function(data) { return data.value; }))
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
    var svg = d3.select('svg')
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
      .attr('x', function (d) {return d.x * 1.5;})
      .attr('y', function (d) {return d.y * 7;})
      .style('stroke', 'black')
      .style('stroke-width', 0)
      .style('fill', function (d) { return colorScale(d.weight); })
      .style('fill-opacity', function (d) {return d.weight * 0.2;})
      .on('mouseover', gridOver);


    var log = d3.scale.log()
      .domain([0.1, 100, 1000])
      .range(['rgb(46, 73, 123)', 'rgb(71, 187, 94)']);

    svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(610,50)');

    var legend = d3.legend.color()
      .scale(colorScale)
      .cells([0.1, 5, 10, 50])
      .labels('');

    svg.select('.legend')
      .call(legend);

    function gridOver(d) {
      //console.log(d);
      d3.selectAll('rect').style('stroke-width', function (p) {return p.x === d.x && p.y === d.y ? '1px' : '0px';});
    }
  });
})();