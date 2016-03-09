(function(){

  var width = 800;
  var height = 400;
  var margins = {
    top: 80,
    left: 15
  };
  var numberOfHours = 24;
  var data_json;
  var yaw = -1.19;
  var pitch = 0.56;
  var drag = false;

  d3.json("/data/hourly_load_profile.json", function (error, json) {
    if (error) return console.error(error);
    data_json = json;
    var svg = d3.select('#time-series')
      .append('svg')
      .attr('height', height)
      .attr('width', width);

    var transformPoint = function (point) {
      var cosA = Math.cos(pitch);
      var sinA = Math.sin(pitch);
      var cosB = Math.cos(yaw);
      var sinB = Math.sin(yaw);
      var cosineB = cosB;
      var sineB = sinB;
      var sineAsineB = sinA * sinB;
      var cosineA = cosA;
      var sineAcosineB = sinA * cosB;
      var sineBcosineA = sinB * cosA;
      var sineA = sinA;
      var cosineAcosineB = cosA * cosB;
      var x = cosineB * point[0] + sineB * point[2];
      var y = sineAsineB * point[0] + cosineA * point[1] - sineAcosineB * point[2];
      var z = -sineBcosineA * point[0] + sineA * point[1] + cosineAcosineB * point[2];
      console.log(x,y,z);
      return [x, y, z];
    };

    var getTransformedData = function () {
      var t, output = [];
      var heights = data_json.Hours;
      var xlength = data_json.Hours.length;
      var ylength = data_json.Hours[0].length;
      for (var x = 0; x < xlength; x++) {
        output.push(t = []);
        for (var y = 0; y < ylength; y++) {

          t.push(transformPoint([(x - (xlength - margins.top) / 2) / (xlength * 1.8) * width, heights[x][y], (y - (ylength - margins.left) / 2) / (ylength * 1.8) * width]));
        }
      }
      return output;
    };
    var renderSurface = function () {
      var originalData = data_json.Hours;
      var data = getTransformedData();
      var xlength = data_json.Hours.length;
      var ylength = data_json.Hours[0].length;
      var d0 = [];
      for (var x = 0; x < xlength - 1; x++) {
        for (var y = 0; y < ylength - 1; y++) {
          var depth = data[x][y][2] + data[x + 1][y][2] + data[x + 1][y + 1][2] + data[x][y + 1][2];
          if (x === 0) {
            console.log(depth);
          }

          d0.push({
            path: 'M' + (data[x][y][0] + width / 2).toFixed(10) + ',' + (data[x][y][1] + height / 2).toFixed(10) +
            'L' + (data[x + 1][y][0] + width / 2).toFixed(10) + ',' + (data[x + 1][y][1] + height / 2).toFixed(10) +
            'L' + (data[x + 1][y + 1][0] + width / 2).toFixed(10) + ',' + (data[x + 1][y + 1][1] + height / 2).toFixed(10) +
              'L' + (data[x][y + 1][0] + width / 2).toFixed(10) + ',' + (data[x][y + 1][1] + height / 2).toFixed(10) + 'Z',
            depth: depth, data: originalData[x][y],
            class: 'line' + x.toString()
          });

          // TODO: Can I add a class to select this Path and all
        }

      }
      d0.sort(function (a, b) {
        return b.depth - a.depth
      });
      var dr = svg.selectAll('path').data(d0);
      dr.enter().append("path");
      dr.attr("d", function (d) {
        return d.path;
      });
      dr.attr("class", function(d) {
        return d.class;
      });
      dr.attr('stroke-width', 0.64);
      dr.attr('stroke', '#000000');
      dr.attr('fill', function(d) {
        var c = d3.hsl((d.data + 100), 0.6, 0.5).rgb();
        return "rgb(" + parseInt(c.r) + "," + parseInt(c.g) + "," + parseInt(c.b) + ")";
      });
//      dr.on('mouseover', function(d, i) {
//        var currentState = this;
//        console.log(currentState);
//        d3.select(this.getAttribute('class')).style('color', 'red');
//      })
//      .on('mouseout', function(d, i) {
//        d3.selectAll('path')
//            .style({
//              'fill-opacity':.7
//            });
//      });
    };
    renderSurface();

    svg.on("mousedown", function () {
      drag = [d3.mouse(this), yaw, pitch];
    }).on('mouseover', function () {
        console.log('h');
        var change_color = svg.selectAll("." + this.getAttribute('class'));
        console.log(change_color);
      })
      .on("mouseup", function () {
        drag = false;
      }).on("mousemove", function () {
      if (drag) {
        var mouse = d3.mouse(this);
        yaw = drag[1] - (mouse[0] - drag[0][0]) / 50;
        pitch = drag[2] + (mouse[1] - drag[0][1]) / 50;
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
        renderSurface();
        console.log('yaw: ', yaw);
        console.log('pitch:', pitch);
      }
    });

    svg.append('rect')
      .attr('x', 590)
      .attr('y', 10)
      .attr('height', 380)
      .attr('width', 200)
      .attr('fill-opacity', 0.4)
      .style('color', 'red');

  });

})();
