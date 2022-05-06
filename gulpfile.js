'use strict';

const {series, src, dest} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compileIconfont() {
    return src('./iconfont/*.scss')
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ['ie > 9', 'last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(dest('./lib/iconfont'));
}

function copyIconfont() {
    return src('./iconfont/fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/iconfont/fonts'));
}

function copyImages() {
    return src('./img/**')
        .pipe(dest('./lib/img'));
}

function copyConfigAssets() {
    return src('./src/config/assets/**')
        .pipe(dest('./lib/config/assets'));
}

function copyConfig() {
    return src('./src/config/config.js')
        .pipe(dest('./lib/config'));
}

exports.build = series(copyIconfont, compileIconfont, copyImages, copyConfig, copyConfigAssets);
