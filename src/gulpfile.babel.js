const gulp = require('gulp');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const browserSync = require('browser-sync');
const jsFiles = ['*.js', 'wwwroot/js/*.js'];
const nodeMon = require('gulp-nodemon');

gulp.task('lint', () => {
  return gulp.src(jsFiles)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('inject', () => {
  let wiredep = require('wiredep').stream;
  let inject = require('gulp-inject');
  let injectSrc = gulp.src(['./wwwroot/css/*.css',
                            './wwwroot/js/*.js'], {read: false});
  let injectOptions = {
    addRootSlash: false,
    ignorePath: 'wwwroot'
  };


  let options = {
    bowerJson: require('./bower.json'),
    directory: './wwwroot/lib'
  };
  return gulp.src('./wwwroot/*.html')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./wwwroot'));
});

gulp.task('serve', ['lint'], () => {
  startBrowserSync();
  let options = {
    script: 'server/app.js',
    delayTime: 1,
    env: {
      'PORT': 8080
    },
    watch: jsFiles
  };
  return nodeMon(options)
    .on('restart', function(ev) {
      console.log('restarting...');
    });
});

function startBrowserSync() {
  if (browserSync.active) {
    return;
  }
  let options = {
    port: 3000,
    proxy: 'localhost:8080',
    files: ['**/*.*'],
    ghostMode: {
      clicks: true,
      locations: false,
      forms: true,
      scroll: true
    },
    browser: 'google chrome',
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 1000
  };
  console.log('starting browser-sync on port 8080');
  browserSync(options);
}