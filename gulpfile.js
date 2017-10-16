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
 del = require('del')

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
	gulp.src('./src/js/*.js')
		// .pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
})

gulp.task('copy', function () {
	gulp.src('./src/html/**/*').pipe(gulp.dest('dist/html/'))
	gulp.src('./src/css/*.css').pipe(gulp.dest('dist/css/'))
	gulp.src('./src/fonts/**/*').pipe(gulp.dest('dist/fonts/'))
    gulp.src('./src/layer/**/*').pipe(gulp.dest('dist/layer/'))

})

gulp.task('clean',function () {
	del('dist/')
})

gulp.task('watch',function () {
	gulp.watch('./src/css/**/*.scss',['sass'])
	gulp.watch('./src/img/**/*',['images','copy'])
	gulp.watch('./src/js/**/*',['js'])
	gulp.watch('./src/html/**/*',['copy'])
})

gulp.task('default', ['sass','images','js','copy','watch'])

