
var csv = require('csv-streamify');
var fs = require('fs')
var sh = require("shelljs");
var cwd = sh.pwd();
console.log(cwd);
fs.readFile('server/EmploymentStatus', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var results = data.split('\n');
  var jsonObject = [];
  var finalResponse = { token: "12341234", states: null, data: null };
  
  for (var i = 0; i < results.length; i++) 
  {
    var jsonTwo = [];
    var breakCheck1 = false;
    var j = results[i].split(' ');
    for (var k = 0; k < j.length; k++)
    {
      if (k === 0) {
        if (j[0] === '') {
          if (j.length === 69) {
            // Year and Month
            console.log('wat');
            console.log(results[i]);
            finalResponse.states = j;
          } else if (j.length === 1) {
            breakCheck1 = true;
            break;
          } else if (j.length === 46) {
            
          } else {
            //console.log(j.length);
          }
          
        } else {
          //console.log(j[k]);
          //jsonObject.push(j[k]);          
        }
      }
      else {
        var value = parseFloat(j[k]);
        if (value !== value || value === 0) {
          // if value !== value, value is NaN
          
        } else {
          jsonTwo.push(value);
        }
      }
    }
  
    if (breakCheck1) { break; }
    

  }
  finalResponse.data = jsonTwo;
  jsonObject.push(finalResponse);
  //console.log(jsonObject);
  //console.log(jsonTwo);
  
  
   
  // var arr = results.split(' ').map(function (val) {
  //   return Number(val) + 1;
  // });
  
});

  
// .pipe(parser())
// .pipe(JSONStream.stringify(false))
// .pipe(process.stdout);

// function Parser(options) {
//   console.log('hello');
// };

//Parser('hello');



