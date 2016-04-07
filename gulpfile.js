var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('js', function() {
  gulp.src(['src/**/library_journeys.js', 'src/**/*.js'])
    .pipe(concat('library_journeys.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('minify', ['js'], function() {
  gulp.src('dist/library_journeys.js')
    .pipe(uglify())
    .pipe(rename('library_journeys.min.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['js'], function() {
  gulp.watch('src/**/*.js', ['js'])
})

gulp.task('default', ['watch'])
