(function() {

  d3.json('/data/boxplots/ac_load_boxplot.json', function (error, jsonFile) {
    var svg = d3.select('#time-series')
      .append('svg')
      .attr('width', 700)
      .attr('height', 400);
    nv.addGraph(function() {
      var chart = nv.models
        .boxPlotChart()
        .x(function(d) { return d.label; })
        .staggerLabels(false)
        .maxBoxWidth(75)
        .yDomain([0, d3.max(jsonFile.data, function(d) {
          return d.values.whisker_high;
        })]);
      chart.color(['#3F51B5']);
      chart.yAxis.axisLabel(jsonFile.units);
      svg.datum(jsonFile.data)
        .call(chart);

      nv.utils.windowResize(chart.update);


    });


  });
})();
