var express = require('express');
var glob = require('glob');

var app = express();
var port = 8080;

app.use(express.static('wwwroot'));
app.set('views', './views');
app.set('view engine', 'ejs');

var navigation = [{
  url:'/',
  text:'Intro to SVG'
}, {
  url:'/timeseries/0',
  text:'Simple Time Series'
}, {
  url:'/timeseries/3',
  text:'NVD3'
}, {
  url:'/timeseries/6',
  text:'Box Plots'
}, {
  url:'/timeseries/4',
  text:'Hour Legend'
}, {
  url:'/timeseries/5',
  text:'Year Legend'
},{
  url:'/heat',
  text:'Heat Maps'
}];

app.get('/timeseries', function(req, res){
  req.params.step = 0;
  scratchPad(req, res, 'timeseries');
});
app.get('/timeseries/:step', function(req, res) {
  scratchPad(req, res, 'timeseries');
});
app.get('/scratchpad', function(req, res) {
  req.params.step = 0;
  scratchPad(req, res, 'scratchpad');
});
app.get('/scratchpad/:step', function(req, res) {
  scratchPad(req, res, 'scratchpad');
});

app.get('/dataset/', function(req, res) {
  var dropDownMenu = [];
  glob('wwwroot/data/timeseries/*.*', function (er, files) {
    files.forEach(function(element, it) {
      var prettyName = element.replace('wwwroot/data/timeseries/', '');
      prettyName = prettyName.replace('.json', '');
      var dropDownElement = {key: prettyName, value: element};
      dropDownMenu.push(dropDownElement);
    });
    res.json(dropDownMenu);
  });
});

function scratchPad(req, res, type) {
  var step = req.params.step;
  var script;
  if (type === 'timeseries') {
    script = '/js/timeSeries' + step + '.js';
  } else {
    script = '/js/scratchpad' + step + '.js';
  }
  res.locals.scripts = script;
  res.render('scratchpad', {
    nav: navigation
  });
}

app.get('/heat', function(req, res) {
  res.render('heat', {
    nav: navigation
  });
});
app.get('/', function(req, res) {
  res.render('svg', {
    nav: navigation
  });
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
