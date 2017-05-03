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
 uglify = require('gulp-uglify'),
 del = require('del');


gulp.task('sass',function () {
	 gulp.src('./src/css/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(postcss([px2rem({remUnit: 75})]))
		.pipe(gulp.dest('dist/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css/'))
})

gulp.task('images', function () {
	 gulp.src('./src/img/**/*')
		.pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('dist/img/'))
	}
)

gulp.task('js', function () {
	gulp.src('./src/js/register.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
})

gulp.task('copy', function () {
	gulp.src('./src/html/**/*').pipe(gulp.dest('dist/html'))
	gulp.src('./src/css/reset.css').pipe(gulp.dest('dist/css/'))
})

gulp.task('clean', function (cb) {
	del('dist/',  cb)
})

gulp.task('watch',function () {
	gulp.watch('./src/css/**/*.scss',['sass'])
	gulp.watch('./src/img/**/*',['images'])
	gulp.watch('./src/js/**/*',['js'])
	gulp.watch('./src/html/**/*',['copy'])
})

gulp.task('default',['clean','sass','images','js','copy','watch'])