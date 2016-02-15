var express = require('express');

var app = express();
var port = 8080;
var d3Router = express.Router();
//var timeSeriesRouter = express.Router();

app.use(express.static('wwwroot'));
app.set('views', './views');
app.set('view engine', 'ejs');

var navigation = [{
  url:'/svg',
  text:'Intro'
}, {
  url:'/trees',
  text:'Trees'
}, {
  url:'/timeseries/0',
  text:'Time Series'
}];
var scripts = [
  '/js/timeSeries0.js',
  '/js/timeSeries1.js'
];
app.get('/timeseries', function(req, res){
  req.params.step = 0;
  timeSeries(req, res);
});
app.get('/timeseries/:step', function(req, res) {
  timeSeries(req, res);
});

function timeSeries(req, res) {
  var step = req.params.step;
  console.log(step);
  res.locals.scripts = scripts[step];
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


//timeSeriesRouter.route('/')
//  .get(function(req, res) {
//    res.locals.scripts = [
//      './js/timeSeries.js'
//    ];
//    res.render('timeseries', {
//      nav: navigation
//    });
//  });

app.use('/svg', d3Router);

app.get('/test', function(req, res) {
  res.render('index', {
            title: 'D3 Intro',
            nav: navigation
  });
});

//var links = [{'url':'index.html', 'title':'Intro to SVG'} , {'url':'tree.html', 'title':'Trees'},
//  {'url':'surface.html', title: 'Time Series'},
//  {'url':'surface4.html', 'title':'Heat Maps'}];
//
//getPosts(links);



app.listen(port, function(err) {

  console.log('running server on port ' + port);
});
