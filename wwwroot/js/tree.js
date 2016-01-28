(function () {

    function branchTree(branch) {
        branches.push(branch);
        if (branch.depth === max_depth)
            return;
        var left_branch = {
            x1: branch.x2,
            y1: branch.y2,
            x2: branch.x2 + branch.length * Math.sin(branch.angle),
            y2: branch.y2 - branch.length * Math.cos(branch.angle),
            angle: branch.angle - theta,
            length: branch.length * successive_branch_length_ratio,
            depth: branch.depth + 1,
        };
        branchTree(left_branch);

        var right_branch = {
            x1: branch.x2,
            y1: branch.y2,
            x2: branch.x2 + branch.length * Math.sin(branch.angle),
            y2: branch.y2 - branch.length * Math.cos(branch.angle),
            angle: branch.angle + theta,
            length: branch.length * successive_branch_length_ratio,
            depth: branch.depth + 1,
        };
        branchTree(right_branch);
    }

    var branches = [];
    var initial_length = 100;
    var base_x_point = 240;
    var base_y_point = 500;

    // make sliders from these:
    var successive_branch_length_ratio = 0.8;
    //var theta = 5.5;
    var theta = 0.5;
    //var theta = 1.5;
    var opacity = -1.4;
    var max_depth = 12;
    var trunk = {
        depth: 0,
        x1: base_x_point,
        y1: base_y_point,
        x2: base_x_point,
        y2: base_y_point - initial_length,
        angle: 0,
        length: initial_length * successive_branch_length_ratio
    };



    branches = [];
    branchTree(trunk);
    create();

    function create() {
        var svg = d3.select("#treeBackground").append("svg")
            .attr("width", 600)
            .attr("height", 500);

        svg.selectAll('line')
            .data(branches)
            .enter()
            .append('line')
            .style('stroke', '#ffffff')
            .attr('x1', function (d) { return d.x1; })
            .attr('y1', function (d) { return d.y1; })
            .attr('x2', function (d) { return d.x2; })
            .attr('y2', function (d) { return d.y2; })
            .style('stroke-opacity', function (d) { return (max_depth + opacity - d.depth ) * .1; })
            .style('stroke-width', function (d) { return parseInt(max_depth + 1 - d.depth) + 'px'; });
    }
})();
