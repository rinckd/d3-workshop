(function() {
  'use strict';
  d3.json('/data/hourly_load_profile.json', function(error, dataJson) {
    var height = 500;
    var minTime = new Date(2016, 0, 1);
    var maxTime = d3.time.hour.offset(minTime, 24 * 7);
    var data5 = [{key: 'Electrical Load (kW)', values: []}];
    dataJson.forEach(function(el, i) {
      var timeIterator = d3.time.hour.offset(minTime, i);
      data5[0].values.push({x: timeIterator, y: el.value});
    });

    nv.addGraph(function () {
      var chart = nv.models.lineWithFocusChart();
      chart.xAxis
        .tickFormat(function(d) {
          return d3.time.format('%b %-d %-I%p')(new Date(d));
        });
      chart.xAxis.rotateLabels(-45);
      chart.xScale(d3.time.scale());
      chart.yAxis
        .tickFormat(d3.format(',.2f'));
      chart.yAxis.axisLabel('kW');
      chart.x2Axis
        .tickFormat(function(d) {
          return d3.time.format('%b %-d %-I%p')(new Date(d));
        });
      chart.y2Axis
        .tickFormat(d3.format(',.2f'));
      chart.margin({bottom:80});
      var svg = d3.select('#timeSeries').append('svg')
        .attr('height', height);
      chart.brushExtent([minTime, maxTime]);

      svg.datum(data5)
        .transition().duration(500)
        .call(chart)
      ;
      nv.utils.windowResize(chart.update);

      return chart;
    });
  });

})();
