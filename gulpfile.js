var gulp = require('gulp');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsFiles = ['*.js', 'wwwroot/js/*.js'];
var nodeMon = require('gulp-nodemon');

gulp.task('style', function() {
  return gulp.src(jsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish', {
        verbose:true
      }))
      .pipe(jscs())
      .pipe(jscs.reporter());
});

gulp.task('serve', ['style'], function() {
  startBrowserSync();
  var options = {
    script: 'server/app.js',
    delayTime: 1,
    env: {
      'PORT': 8080
    },
    tasks: ['style'],
    watch: jsFiles
  }
  return nodeMon(options)
    .on('restart', function(ev) {
      console.log('restarting...');
    })
});

function startBrowserSync() {
  if (browserSync.active) {
    return;
  }
  var options = {
    port: 3000,
    proxy: 'localhost:8080',
    files: ['**/*.*'],
    ghostMode: {
      clicks: true,
      locations: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 1000
  }
  console.log('starting browser-sync on port 8080');
  browserSync(options);
}