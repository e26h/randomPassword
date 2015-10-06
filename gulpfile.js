'use strict';

var gulp = require('gulp'),
	babel = require('gulp-babel'),
	ngmin = require('gulp-ngmin'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	changed = require('gulp-changed'),
	browserSync = require('browser-sync'),
	minifyCss = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	templateCache = require('gulp-angular-templatecache');


// const $ = gulpLoadPlugins();
const srcDir = 'src'
const releaseDir = 'www'
const bower = 'bower_modules'

gulp.task('minCss', () => {
	gulp.src(['src/css/*.css', '!src/css/*.min.css'])
		.pipe(changed('www/css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(minifyCss())
		.pipe(gulp.dest('www/css'))

	gulp.src('src/css/*.min.css')
		.pipe(changed('www/css'))
		.pipe(gulp.dest('www/css'))
});

gulp.task('minJs', () => {
	gulp.src(['src/js/*.js', '!src/js/*.min.js'])
		.pipe(changed('www/js'))
		.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(ngmin())
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('www/js'))

	gulp.src('src/js/*.min.js')
		.pipe(changed('www/js'))
		.pipe(gulp.dest('www/js'))
});

gulp.task('minHtml', () => {
	const setting = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		minifyJS: true,//压缩页面JS
		minifyCSS: true//压缩页面CSS
	}

	gulp.src('src/index.html')
		.pipe(htmlmin(setting))
		.pipe(gulp.dest('www'))

	gulp.src('src/views/*.html')
		.pipe(templateCache())
		.pipe(gulp.dest('www/js'))
});

gulp.task('mods', () => {
	gulp.src('src/modules/*.json')
		.pipe(gulp.dest('www/mods'))
});

gulp.task('bSync', () => {
	browserSync({
		server: {
			baseDir: "./www"
		}
	});
});

gulp.task('default', ['minCss', 'minJs', 'ngTemplate']);

gulp.task('test', () => gulp.src(['src/js/*.js', '!src/js/*.min.js'])
	.pipe(gulp.dest('temp'))
);
