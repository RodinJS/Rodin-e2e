'use strict';

const gulp = require('gulp');
const protractor = require('gulp-protractor');
const browserSync = require('browser-sync');

// Downloads the selenium webdriver
gulp.task('webdriver-update', protractor.webdriver_update);

gulp.task('webdriver-standalone', protractor.webdriver_standalone);

//gulp.task('e2e:auto', ['start:server','webdriver-update'], runProtractor);

gulp.task('e2e', ['webdriver-update'], runProtractor);

function runProtractor(done) {
    var params = process.argv;
    var args = params.length > 3 ? [params[3], params[4]] : [];
    if(params.length > 3 && params[3] === '--host'){
        process.env.KEMVI_E2E_HOST = params[4];
    }

    console.log(args);
    gulp.src('dummy')
        .pipe(protractor.protractor({
            configFile: 'e2e/configs/protractor.conf.js'
        }))
        .on('error', (err) => {
            console.log(err);
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
        .on('end',  () => {
            // Close browser sync server
            browserSync.exit();
            done();
        });
}
