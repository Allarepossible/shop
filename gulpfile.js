var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    compass = require('gulp-compass'),
    rimraf = require('gulp-rimraf'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size'),
    htmlmin = require('gulp-htmlmin'),
    minifyCss = require('gulp-minify-css');


var jadePath = 'app/jade/_pages/*.jade';
var scssPath = 'app/sass/**/*.scss';

// Сервер
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
});

//compass
gulp.task('compass', function() {
  gulp.src(scssPath)
    .pipe(plumber())
    .pipe(compass({
      config_file: 'config.rb',
      css: 'app/css',
      sass: 'app/sass'
    }))
    .pipe(gulp.dest('app/css'));
});


//jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src(jadePath)
    .pipe(plumber())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty : '\t',
    }))
    .pipe(gulp.dest('app'))
});


// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
  gulp.watch(jadePath, ['jade']); 
  gulp.watch('app/sass/**/*.scss', ['compass'])
});


// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);


// СБОРКА
// Переносим HTML CSS JS в папку dist
gulp.task('css', function() {
  return gulp.src('app/css/*.css')
    .pipe(minifyCss({compability: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('js', function() {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
gulp.task('minify', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});
// Очистка
gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
  .pipe(rimraf());
});

// Перенос шрифтов
gulp.task('fonts', function() {
  gulp.src('app/font/*')
    .pipe(filter(['*.eot', '*.svg', '*.ttf', '*.woff2', '*.woff']))
    .pipe(gulp.dest('dist/font/'));
});

// Картинки
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});


// Собираем папку DIST
gulp.task('build', ['clean'], function() {
    gulp.start('dist');
});

// Сборка и вывод размера содержимого папки dist
gulp.task('dist',  ['css', 'js', 'minify', 'images', 'fonts'], function() {
  return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});