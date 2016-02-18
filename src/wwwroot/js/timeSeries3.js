(function() {
  d3.json('/data/hourly_load_profile.json', function(error, data_json) {
    var data5 = [{key: 'Electrical Load (kW)', values: []}];
    data_json.forEach(function(el, i) {
      var date = new Date(2016, 0, 1);
      var time_iterator = d3.time.hour.offset(date, i);
      data5[0].values.push({x: time_iterator, y: el.value});
    });

    nv.addGraph(function () {
      var chart = nv.models.lineWithFocusChart();
      chart.xAxis
        .tickFormat(function(d) {
          return d3.time.format('%m-%d %-I%p')(new Date(d));
        });
      chart.xAxis.rotateLabels(-45);
      chart.xScale(d3.time.scale());
      chart.yAxis
        .tickFormat(d3.format(',.2f'));
      chart.yAxis.axisLabel("kW");
      chart.x2Axis
        .tickFormat(function(d) {
          return d3.time.format('%m-%d %-I%p')(new Date(d));
        });
      chart.y2Axis
        .tickFormat(d3.format(',.2f'));
      chart.margin({bottom:70});
      var svg = d3.select('#timeSeries').append('svg')
        .attr('height', 500);

      svg.datum(data5)
        .transition().duration(500)
        .call(chart)
      ;

      nv.utils.windowResize(chart.update);

      return chart;
    });
  });

})();