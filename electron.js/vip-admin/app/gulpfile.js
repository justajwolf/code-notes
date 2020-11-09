const rimraf = require('util').promisify(require('rimraf'));
const exec = require('util').promisify(require('child_process').exec);
const gulp = require('gulp');

gulp.task('pages:clean', async cb => {
  await rimraf('../pages/dist/**/*');
  await rimraf('./pages');
  cb();
});
gulp.task('pages:build', async cb => {
  await exec('cd ../pages && npm run build');
  cb();
});
gulp.task('pages:copy', () => gulp.src('../pages/dist/**/*').pipe(gulp.dest('./pages')));
gulp.task('build', gulp.series.apply(gulp, [
  'pages:clean',
  'pages:build',
  'pages:copy',
]));


gulp.task('package:clean', async cb => {
  await rimraf('./out');
  cb();
})
gulp.task('package:exec', async cb => {
  await exec('electron-forge package');
  cb();
});
gulp.task('package', gulp.series.apply(gulp, [
  'build',
  'package:clean',
  'package:exec',
]));
