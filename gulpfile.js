'use strict';
/**
  * @gulpfile {for practice}
  * compiles js and scss to css on files changes (dist folder);
  * use "gulp watch" command to start;
  */

const { gulp, src, dest, series, parallel, watch } = require('gulp');
// const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const del = require('del');

function deleteDistFolder () {
  return del('dist');
}

/**
  * @method compileScss
  * @param source {String}
  * @param dist {String}
  */
function compileScss (source, dist) {
  return src(source)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(dest(dist));
}

<<<<<<< HEAD
// ---------------- BUILD PAGES ---------------- //
async function buildApp () {
  await compileScss('app/scss/framework/index.scss', 'dist/App');
}

async function buildHomePage () {
  await compileScss('app/scss/HomePage/index.scss', 'dist/HomePage');
=======
// ---------------- BUILD PAGES ---------------- // // todo class
function buildApp () {
  let date = new Date();
  let page = 'App/Framework'; // todo param
  compileScss('app/scss/framework/index.scss', 'dist/App');
  return console.log (`${page} compiled successfully at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
}

function buildHomePage () {
  let date = new Date();
  let page = 'HomePage'; // todo param
  compileScss('app/scss/HomePage/index.scss', 'dist/HomePage');
  return console.log (`${page} compiled successfully at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
>>>>>>> 1b7ff310d9cbeef28fa71a2f3bb38c1c4753fc8b
}

// function buildCatalogPage () {
//   compileScss('')
// }

// ---------------- BUILD PROJECT ---------------- //
async function buildProject () {
  buildApp();
  // buildCatalogPage();
  await buildHomePage();
}

// ---------------- WATCHER ---------------- //
function watchFiles () {
  watch('app/scss/HomePage/**/*.scss').on('change', buildHomePage);
  watch('app/scss/framework/**/*.scss').on('change', buildApp);
  watch('app/scss/basicComponents/**/*.scss').on('change',buildProject);
}

exports.watch = series(deleteDistFolder, buildProject, watchFiles);
// exports.build = buildProject;
