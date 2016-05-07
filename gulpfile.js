const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
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
    'node_modules/@angular/**/*',
    'node_modules/angular2-in-memory-web-api/**/*',
    'node_modules/rxjs/**/*',
    'node_modules/es6-shim/**/*',
    'node_modules/zone.js/**/*',
    'node_modules/reflect-metadata/**/*',
    'node_modules/systemjs/**/*',
    'node_modules/lodash/**/*'
  ],
};

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('vendorJS', ['clean'], function() {
  return gulp.src(vendor.js, {'base': '.'})
    .pipe(gulp.dest('./dist'));
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

gulp.task('systemjs', ['clean'], function() {
  return gulp.src('./systemjs.config.js')
    .pipe(gulp.dest('./dist'));
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

gulp.task('build', ['html', 'index', 'systemjs', 'scss', 'typescript', 'vendor']);

gulp.task('default', ['build']);

gulp.task('dev', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['app/**/*', 'index.html', 'scss/**/*'], ['reload']);
});

gulp.task('reload', ['build'], browserSync.reload);
