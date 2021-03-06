'use strict';

/**
  * @gulpfile {for practice}
  * compiles js and scss to css on files changes (dist folder);
  * use "gulp watch" command to start;
  * // todo refactor
  */

require('dotenv').config();

const { gulp, src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const del = require('del');

function cleanDistFolder () {
  return del('dist/*');
}

function startBrowserSync () {
  browserSync.init({
    proxy: `localhost:${process.env.PORT}`,
    open: false,
    notify: false
  });
}

/**
  * @method compileScss
  * @param source {String}
  * @param dist {String}
  */
function compileScss (source, dist) {
  return src(source)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(dest(dist));
}

// ---------------- BUILD PAGES ---------------- // // todo class
function build404page () {
  let date = new Date();
  let page = '404page'; // todo param
  compileScss('app/scss/404page/index.scss', 'dist/404page');
  return console.log (`${page} compiled successfully at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
}

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
}

function buildCatalogPage () {
  let date = new Date();
  let page = 'CatalogPage'; // todo param
  compileScss('app/scss/CatalogPage/index.scss', 'dist/CatalogPage');
  return console.log (`${page} compiled successfully at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
}

function buildDeveloperPage () {
  let date = new Date();
  let page = 'DeveloperPage'; // todo param
  compileScss('app/scss/DeveloperPage/index.scss', 'dist/DeveloperPage');
  return console.log (`${page} compiled successfully at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
}


// ---------------- BUILD PROJECT ---------------- //
async function buildProject () {
  await build404page();
  await buildApp();
  await buildHomePage();
  await buildDeveloperPage();
  await buildCatalogPage();
}

// ---------------- WATCHER ---------------- //
function watchFiles () {
  startBrowserSync();
  watch('app/scss/HomePage/**/*.scss').on('change', buildHomePage);
  watch('app/scss/CatalogPage/**/*.scss').on('change', buildCatalogPage);
  watch('app/scss/DeveloperPage/**/*.scss').on('change', buildDeveloperPage);
  watch('app/scss/framework/**/*.scss').on('change', buildApp);
  watch('app/scss/404page/**/*.scss').on('change', build404page);
  watch('app/scss/basicComponents/**/*.scss').on('change',buildProject);
  watch('dist/').on('change', browserSync.reload); // TODO optimize
}

exports.watch = series(cleanDistFolder, buildProject, watchFiles);
exports.build = buildProject;
