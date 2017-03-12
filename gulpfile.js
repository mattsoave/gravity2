const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require ('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

const SRC = "./src";
const DEST = "./build";
 
gulp.task('babel', () => {
    return gulp.src('./js/src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js/build'));
});

// Run babel and also save a minified copy of the babel-ified version
gulp.task("js", function() {
    return gulp.src('./js/src/*.js')
        .pipe(babel({
            compact: false,
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js/build'))
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js"}))
        .pipe(gulp.dest('./js/build'));
});

gulp.task('css', function () {
  return gulp.src('./css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});