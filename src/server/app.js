var express = require('express');
var app = express();

var port = 8080;
var d3Router = express.Router();

app.use(express.static('wwwroot'));
app.set('views', './views');
app.set('view engine', 'ejs');


var navigation = [{
  url:'/SVG',
  text:'Intro'
}, {
  url:'/Trees',
  text:'Trees'
}];


d3Router.route('/')
  .get(function(req, res) {
    res.render('svg', {
      title: 'SVG Intro',
      nav: navigation
    });
  });
d3Router.route('/single')
  .get(function(req, res) {
    res.send('hello single book');
  });

app.use('/SVG', d3Router);

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
