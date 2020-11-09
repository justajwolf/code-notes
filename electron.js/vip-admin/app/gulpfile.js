const promisify = require('util').promisify;
const rimraf = promisify(require('rimraf'));
const exec = promisify(require('child_process').exec);
const gulp = require('gulp');

// 清除旧的构建数据
gulp.task(
  // 'all:clean', async cb => {
  //   await Promise.all([
  //     rimraf('../pages/dist/**/*'),
  //     rimraf('../server/dist/**/*'),
  //     rimraf('./pages'),
  //     rimraf('./server'),
  //     rimraf('./out'),
  //   ]).then(cb)
  // },
  'all:clean', async cb => {
    await rimraf('../pages/dist/**/*');
    await rimraf('../server/dist/**/*');
    await rimraf('./pages');
    await rimraf('./server');
    await rimraf('./out');
    cb();
  },
);

// 构建pages和server
gulp.task('pages:build', async cb => await exec('cd ../pages && npm run build').then(cb));
gulp.task('pages:copy', async (cb) => gulp.src('../pages/dist/**/*').pipe(gulp.dest('./pages')).end(cb));
gulp.task('server:build', async cb => await exec('cd ../server && npm run build').then(cb));
gulp.task('server:copy', async (cb) => gulp.src('../server/dist/**/*').pipe(gulp.dest('./server')).end(cb));
gulp.task(
  'build', gulp.series.apply(gulp, [
    'all:clean',
    gulp.parallel(['pages:build', 'server:build']),
    gulp.parallel(['pages:copy', 'server:copy']),
  ]),
);

// 打包成桌面程序包
gulp.task('package:exec', async cb => await exec('electron-forge package').then(cb));
gulp.task(
  'package', gulp.series.apply(gulp, [
    'build',
    'package:exec',
  ]),
);
