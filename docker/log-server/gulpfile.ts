import gulp = require('gulp');
import rimraf = require('rimraf');
import ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');
gulp.task('clean', async (fn) => await rimraf('dist/**/*', fn));
gulp.task('compiler', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(`${tsProject.options.outDir}/src`));
});
gulp.task('copy', () => {
  return gulp
    .src('static/*')
    .pipe(gulp.dest(`${tsProject.options.outDir}/static`))
});

gulp.task('default', gulp.series('clean', 'compiler', 'copy'));