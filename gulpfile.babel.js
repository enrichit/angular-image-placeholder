import gulp from 'gulp';
import jshint from 'gulp-jshint';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import run from 'run-sequence';
import karma from 'karma';

var paths = {
  js: './src/*',
  out: {
    dir: './dist/',
    file: 'angular-image-utils.js',
    min: 'angular-image-utils.min.js'
  }
};

gulp.task('lint', () =>
  gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('test', (done) =>
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start()
);

gulp.task('concat', () =>
  gulp.src(paths.js)
    .pipe(concat(paths.out.file))
    .pipe(gulp.dest(paths.out.dir))
);

gulp.task('uglify', ['concat'], () =>
  gulp.src(`${paths.out.dir}${paths.out.file}`)
    .pipe(uglify())
    .pipe(rename(paths.out.min))
    .pipe(gulp.dest(paths.out.dir))
);

gulp.task('build', (done) => run(['lint', 'test'], ['concat', 'uglify'], done));