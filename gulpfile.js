/**
 * Created by Doris on 2017/5/2.
 */
'use strict';
var gulp = require('gulp'),
 sass = require('gulp-sass'),
 autoprefixer = require('gulp-autoprefixer'),
 minifycss = require('gulp-minify-css'),
 imagemin = require('gulp-imagemin'),
 postcss = require('gulp-postcss'),
 px2rem = require('postcss-px2rem'),
 rename = require('gulp-rename'),
 cache = require('gulp-cache'),
 del = require('del');


gulp.task('sass',function () {
	 gulp.src('./src/css/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(postcss([px2rem({remUnit: 75})]))
		.pipe(gulp.dest('dist/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'))
})

gulp.task('images', function () {
	 gulp.src('./src/img/**/*')
		.pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dist/img'))
	}
)

gulp.task('clean', function (cb) {
	del(['dist/css', 'dist/img'],  cb)
})

gulp.task('watch',function () {
	gulp.watch('./src/css/**/*.scss',['sass']);
	gulp.watch('./src/img/**/*',['images'])
})

gulp.task('default',['clean','sass','images','watch'])
