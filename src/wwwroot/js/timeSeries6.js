(function() {
  'use strict';
  d3.json('/data/ac_load_boxplot.json', function (error, jsonFile) {
    if (error) {
      return console.error(error);
    }
    var graphUnits = jsonFile.units;
    var svgWidth = 700;
    var svgHeight = 400;
    var svg = d3.select('#timeSeries')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    nv.addGraph(function () {
      var chart = nv.models
        .boxPlotChart()
        .x(function (d) { return d.label })
        .staggerLabels(false)
        .maxBoxWidth(75)
        .yDomain([0, 350]);
      chart.color(['#3f51b5']);
      chart.yAxis.axisLabel(graphUnits);
      svg.datum(jsonFile.data)
        .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });

    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', svgWidth / 2)
      .attr('y', 350)
      .text(jsonFile.title);

  });
})();
