/* D3 Tree http://prcweb.co.uk/lab/d3-tree/ */
/* Copyright 2013 Peter Cook (@prcweb); Licensed MIT */

(function () {



var svg = d3.select('#treeBackground').append('svg')
    .attr('width', "100%")
    .attr('height', "100%");

//svg.append("rect").attr({width: "100%", height:"100%", fill: "#14103c"})
// Tree configuration
var branches = [];
var seed = {i: 0, x: 458, y: 600, a: 0, l: 149, d:0}; // a = angle, l = length, d = depth
var da = 0.3474192384; // Angle delta
var dl = 0.704; // Length delta (factor)
var ar = 0.4; //tributary.anim(-0.5, 0.5); // Randomness
var maxDepth = 6; //lower this for faster rendering
var stroke = "#c4bcba";

var use = [20, 58, 60, 61, 1, 6, 7, 4, 21, 22, 29, 46, 47, 54];

var pathGenerator = d3.svg.line()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
  .interpolate("linear")
  .interpolate("basis");
//.interpolate("cardinal")
//.interpolate("monotone")


// Tree creation functions
function branch(b) {
  var end = endPt(b), daR, newB;
  branches.push(b);

  if (b.d === maxDepth)
    return;

  // Left branch
  daR = ar;
  newB = {
    i: branches.length,
    x: end.x,
    y: end.y,
    a: b.a - da + daR,
    l: b.l * dl,
    d: b.d + 1,
    parent: b.i
  };

  branch(newB);

  // Right branch
  daR = ar;
  newB = {
    i: branches.length,
    x: end.x,
    y: end.y,
    a: b.a + da + daR,
    l: b.l * dl,
    d: b.d + 1,
    parent: b.i
  };

  branch(newB);
}

function regenerate(initialise) {
  branches = [];
  branch(seed);
  create();
}

function endPt(b) {
  // Return endpoint of branch
  var x = b.x + b.l * Math.sin( b.a );
  var y = b.y - b.l * Math.cos( b.a );
  return {x: x, y: y};
}



// D3 functions
function x1(d) {return d.x;}
function y1(d) {return d.y;}
function x2(d) {return endPt(d).x;}
function y2(d) {return endPt(d).y;}
function highlightParents(d) {
  var colour = d3.event.type === 'mouseover' ? 'green' : '#777';
  var depth = d.d;
  for(var i = 0; i <= depth; i++) {
    d3.select('#id-'+parseInt(d.i)).style('stroke', colour);
    d = branches[d.parent];
  }
}


function getPoints(branches) {
  var points = [];
  branches.forEach(function(branch) {
    points.push( {x: x1(branch), y: y1(branch) });
    points.push( {x: x2(branch), y: y2(branch) });
  });
  return points;
}

function getParent(branch, p, branches) {
  if(!branch.parent) return;
  var b = branches[branch.parent];
  p.push({x: b.x, y: b.y});
  getParent(b, p, branches);

}


function getPaths(branches) {
  var paths = [];

  var i = 0;
  branches.forEach(function(branch) {
    if(branch.d < maxDepth) return;
    var p = [{x: branch.x, y: branch.y}];
    getParent(branch, p, branches);
    p.push(seed);
    paths.push(p);
  });
  return paths;
}


function create() {
  var points = getPoints(branches);
  var pths = getPaths(branches);
  var pruned = [];
  var i = 0;
  console.log(use);
  pths.forEach(function (path) {
    i++;
    if (use.indexOf(i) >= 0) {
      pruned.push(path);
    }
  });

  /*
   d3.select('svg')
   .selectAll('line')
   .data(branches)
   .enter()
   .append('line')
   .attr({
   x1: x1,
   y1: y1,
   x2: x2,
   y2: y2
   })
   .attr("fill", "none")
   .attr("stroke", "#fff")
   .attr("stroke-width", 9.32)
   .attr("stroke-opacity", 0.5)
   */
  console.log(pruned.length)
  var pathlines = svg
    .selectAll('path')
    .data(pruned);

  pathlines
    .enter()
    .append('path')
    .attr("fill", "none")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2.56);

  pathlines
    .attr("d", function (d) {
      return pathGenerator(d);
    });

  pathlines.exit().remove();

  //.style("stroke", stroke)
  //.style('stroke-width', function(d) {return parseInt(maxDepth + 1 - d.d) + 'px';})

  var rects = svg.selectAll("rect.selector")
    .data(d3.range(pths.length));

  rects.enter()
    .append("rect").classed("selector", true)
    .on("click", function (d, i) {
      if (use.indexOf(i) >= 0) {
        use.splice(use.indexOf(i), 1)
      } else {
        use.push(i);
      }
      //console.log(use);
      create();
    });

  rects
    .attr({
      x: function (d, i) {
        return 100 + (i % 20) * 30;
      },
      y: function (d, i) {
        return 20 + Math.floor(i / 20) * 30;
      },
      width: 20,
      height: 20
    })
    .attr({
      fill: function (d, i) {
        return use.indexOf(i) >= 0 ? "#fff" : "#000";
      },
      stroke: "#fff"
    });
}
  regenerate();
})();