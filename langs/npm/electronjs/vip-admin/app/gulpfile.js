const promisify = require('util').promisify;
const rimraf = promisify(require('rimraf'));
const exec = promisify(require('child_process').exec);
const gulp = require('gulp');

// 清除旧的构建数据
gulp.task(
  'all:clean', async cb => {
    [
      '../pages/dist',
      '../server/dist',
      './pages',
      './server',
      './out',
    ].reduce((promise, dir) => {
      return promise && (promise = promise.then(() => rimraf(dir)).catch(console.error));
    }, Promise.resolve()).then(cb);
  },
);

// 构建pages和server
gulp.task('pages:build', async cb => await exec('cd ../pages && npm run build') && cb());
gulp.task('server:build', async cb => await exec('cd ../server && npm run build') && cb());
gulp.task('pages:copy', () => gulp.src('../pages/dist/**/*').pipe(gulp.dest('./pages')));
gulp.task('server:copy', () => gulp.src('../server/dist/**/*').pipe(gulp.dest('./server')));
gulp.task(
  'build', gulp.series.apply(gulp, [
    'all:clean',
    gulp.parallel(['pages:build', 'server:build']),
    gulp.parallel(['pages:copy', 'server:copy']),
  ]),
);
