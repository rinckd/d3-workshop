(function () {
  var svgWidth = 700;
  var svgHeight = 800;

  var svg = d3.select('#timeSeries').append('svg').attr('width', svgWidth).attr('height', svgHeight);

  var path = svg.append('svg:path')
    .attr('d','M72.695,185.361c-3.207,2.159-5.557,3.239-7.05,3.239c-0.802,0-1.394-0.342-1.776-1.024c-0.382-0.684-0.574-1.421-0.574-2.215c0-1.524,0.738-3.811,2.213-6.86s2.887-4.573,4.235-4.573c0.692,0,1.285,1.191,1.776,3.573s0.992,4.113,1.503,5.192c2.478-2.287,6.066-6.098,10.767-11.433c5.902-6.764,9.819-10.464,11.75-11.1c0.656-0.222,1.33-0.333,2.022-0.333c0.691,0,1.266,0.127,1.722,0.381c0.455,0.254,0.683,0.572,0.683,0.953c0,0.541-0.529,0.857-1.585,0.953c-1.276,0.604-3.243,2.064-5.902,4.382c-2.66,2.255-4.792,4.367-6.395,6.336c-3.899,4.732-7.907,8.591-12.023,11.576c2.04,2.636,5.247,3.954,9.619,3.954c0.473,0,1.184-0.032,2.131-0.095c10.129-0.826,17.306-4.652,21.533-11.48c1.712-2.731,2.569-5.431,2.569-8.099c0-2.667-1.112-5.065-3.334-7.193c-1.786-1.746-3.726-2.826-5.82-3.239c-2.096-0.413-4.236-0.619-6.422-0.619c-5.611,0-10.785,1.127-15.521,3.382c-4.992,2.382-7.488,5.049-7.488,8.003c0,0.794,0.246,1.445,0.738,1.953c0.492,0.508,0.829,0.794,1.011,0.857h-0.328c-0.948-0.158-1.785-0.572-2.514-1.238c-0.802-0.826-1.203-1.699-1.203-2.62c0-3.175,2.286-5.907,6.859-8.194c4.572-2.287,9.938-3.43,16.095-3.43c2.842,0,5.756,0.286,8.745,0.858c2.987,0.571,5.702,1.938,8.143,4.097c2.805,2.541,4.208,5.415,4.208,8.623c0,2.382-0.802,4.843-2.404,7.384c-2.77,4.383-6.905,7.591-12.406,9.623c-4.409,1.62-9.164,2.43-14.264,2.43C78.906,189.362,75.135,188.028,72.695,185.361z M65.262,185.17c0,0.984,0.219,1.841,0.656,2.572c1.566-0.604,3.461-1.858,5.684-3.763c-1.057-1.524-1.722-2.723-1.995-3.597c-0.273-0.873-0.465-2.025-0.574-3.454C66.519,180.073,65.262,182.82,65.262,185.17z M73.077,171.832c0.036,0,0.073-0.016,0.109-0.047c0,0.064-0.009,0.095-0.027,0.095C73.14,171.879,73.113,171.864,73.077,171.832z')
    .attr('class', 'spirograph')
    .style('stroke-width', 2)
    .style('stroke', 'steelblue')
    .style('fill', 'none');

  var totalLength = path.node().getTotalLength();

  //Create a (random) dash pattern
  //The first number specifies the length of the visible part, the dash
  //The second number specifies the length of the invisible part
  var dashing = "12, 6";

  //This returns the length of adding all of the numbers in dashing (the length of one pattern in essense)
  //So for "6,6", for example, that would return 6+6 = 12
  var dashLength = dashing
    .split(/[\s,]/)
    .map(function (a) { return parseFloat(a) || 0 })
    .reduce(function (a, b) { return a + b });

  //How many of these dash patterns will fit inside the entire path?
  var dashCount = Math.ceil( totalLength / dashLength );

  //Create an array that holds the pattern as often so it will fill the entire path
  var newDashes = new Array(dashCount).join( dashing + " " );
  //Then add one more dash pattern, namely with a visible part of length 0 (so nothing) and a white part
  //that is the same length as the entire path
  var dashArray = newDashes + " 0, " + totalLength;

  //Now offset the entire dash pattern, so only the last white section is
  //visible and then decrease this offset in a transition to show the dashes
  path
    .attr("stroke-dashoffset", totalLength)
    .attr("stroke-dasharray", dashArray)	//This is where it differs with the solid line example
    .transition().duration(30000).ease("linear")
    .attr("stroke-dashoffset", 0);

}());
