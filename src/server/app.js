var express = require('express');

var app = express();
var port = 8080;
var d3Router = express.Router();

app.use(express.static('wwwroot'));
app.set('views', './views');
app.set('view engine', 'ejs');

var navigation = [{
  url:'/svg',
  text:'Intro to SVG'
}, {
  url:'/timeseries/0',
  text:'Simple Time Series'
}, {
  url:'/timeseries/2',
  text:'More Time Series'
}, {
  url:'/timeseries/4',
  text:'Legends'
}, {
  url:'/timeseries/3',
  text:'NVD3'
},{
  url:'/heat',
  text:'Heat Maps'
}];

app.get('/timeseries', function(req, res){
  req.params.step = 0;
  timeSeries(req, res);
});
app.get('/timeseries/:step', function(req, res) {
  timeSeries(req, res);
});

function timeSeries(req, res) {
  var step = req.params.step;
  var script = '/js/timeSeries' + step + '.js';
  console.log(script);
  res.locals.scripts = script;
  res.render('timeseries', {
    nav: navigation
  });

  //...
}

d3Router.route('/')
  .get(function(req, res) {
    res.render('svg', {
      title: 'SVG Intro',
      nav: navigation
    });
  });
app.use('/svg', d3Router);
app.get('/heat', function(req, res) {
  res.render('heat', {
    title: 'Heat Map',
    nav: navigation
  });
});
app.get('/', function(req, res) {
  res.render('index', {
            title: 'D3 Intro',
            nav: navigation
  });
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
