const { src, series, parallel, dest, watch } = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const csso = require('gulp-csso');
const mode = require('gulp-mode')();
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const webpack = require('webpack-stream');

// Source Path
const js_src   = 'app/**/*.js';
const html_src = './*.html'
const css_src = './app/**/*.css'
const img_src = './app/assets/img/**/*.{png,jpg,jpeg,gif,svg}'
const fonts_src = './app/assets/fonts/**/*.{svg,eot,ttf,woff,woff2}'

// Limpa as tarefas existentes
const clean = () => {
	return del(['app_es5']);
}
  
const cleanImages = () => {
	return del(['app_es5/assets/img']);
}
  
const cleanFonts = () => {
	return del(['app_es5/assets/fonts']);
}

// ES6 - > ES5, concat and minify
const scripts = () => {
	return src(js_src)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(webpack({
			mode: 'development',
			devtool: 'inline-source-map'
		  }))
		.pipe(mode.development( sourcemaps.init({ loadMaps: true }) ))
		.pipe(rename('app.js'))
		.pipe(mode.production( terser({ output: { comments: false }}) ))
		.pipe(mode.development( sourcemaps.write('.') ))
		.pipe(dest('app_es5/js'))
		.pipe(mode.development( browserSync.stream()));
};

const css = () => {
	return src(css_src)
	.pipe(mode.development( sourcemaps.init() ))
	.pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename('app.css'))
    .pipe(mode.production( csso() ))
    .pipe(mode.development( sourcemaps.write('.') ))
    .pipe(dest('app_es5/css'))
    .pipe(mode.development( browserSync.stream() ));
};

// copy tasks
const copyImages = () => {
	return src(img_src)
	.pipe(dest('app_es5/assets/img'));
}
  
const copyFonts = () => {
	return src(fonts_src)
	.pipe(dest('app_es5/assets/fonts'));
}

// watch task
const watchForChanges = () => {
	browserSync.init({
	  server: {
		baseDir: './'
	  }
	});
  
	watch(css_src, css)
	watch(js_src, scripts)
	watch(html_src).on('change', browserSync.reload);
	watch(img_src, series(cleanImages, copyImages));
	watch(fonts_src, series(cleanFonts, copyFonts));
}
  
// public tasks
exports.default = series(clean, parallel(css, scripts, copyImages, copyFonts), watchForChanges);
exports.build = series(clean, parallel(css, scripts, copyImages, copyFonts));
