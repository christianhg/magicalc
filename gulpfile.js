const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');
const tsConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');
const typescript = require('gulp-typescript');

const vendor = {
  css: [
  ],
  fonts: [
  ],
  js: [
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.dev.js',
    'node_modules/lodash/index.js',
  ],
};

gulp.task('clean', function() {
  return del('dist/**/*');
});

gulp.task('vendorJS', ['clean'], function() {
  return gulp.src(vendor.js)
    .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('vendor', ['vendorJS']);

gulp.task('html', ['clean'], function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./dist/app'));
});

gulp.task('index', ['clean'], function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', ['clean'], function() {
  return sass('./scss/styles.scss', {sourcemap: true, style: 'compact'})
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('tslint', function() {
  return gulp.src('./app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('typescript', ['clean', 'tslint'], function() {
  return gulp.src([
      './typings/main.d.ts',
      './app/**/*.ts'
    ])
    .pipe(sourcemaps.init())
    .pipe(typescript(tsConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/app'));
});

gulp.task('build', ['html', 'index', 'scss', 'typescript', 'vendor']);

gulp.task('default', ['build']);

gulp.task('dev', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['./app/**/*', './index.html', './scss/**/*'], ['reload']);
});

gulp.task('reload', ['build'], browserSync.reload);
