(function() {
  'use strict';
  d3.json('/data/ac_load.json', function(error, json) {

    var displayData = [{key: json.units, values: []}];
    json.data.forEach(function(el, i) {
      var format = d3.time.format('%m/%d/%Y %H:%M');
      var d3Date = format.parse(el.date);
      displayData[0].values.push({x: d3Date, y: el.value});
    });

    var svg = d3.select('#timeSeries').append('svg')
      .attr('height', 500);

    nv.addGraph(function () {
      var chart = nv.models.lineWithFocusChart();

      chart.xAxis
        .tickFormat(function(d) {
          return d3.time.format('%b %-d %-I%p')(new Date(d));
        });

      chart.xScale(d3.time.scale());
      chart.yAxis
        .tickFormat(d3.format(',.1f'));
      chart.x2Axis
        .tickFormat(function(d) {
          return d3.time.format('%b %-d')(new Date(d));
        });
      chart.margin({bottom:80});


      var minTime = displayData[0].values[0].x;
      var maxTime = d3.time.hour.offset(minTime, 24 * 7);
      chart.brushExtent([minTime, maxTime]);

      chart.xAxis.rotateLabels(-45);


      svg.datum(displayData)
        .transition().duration(500)
        .call(chart);
      nv.utils.windowResize(chart.update);
      var title = json.title + ' (' + json.units + ')';
      svg.append('text')
        .attr('x', 300)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('class', 'mdl-card__title-text')
        .text(title);
      return chart;
    });


  });

})();
