var bump = require('gulp-bump');
var git = require('gulp-git');
var gulp = require('gulp');
var npm = require('npm');


gulp.task('bump', function () {
    return gulp.src(['./package.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('ci', ['bump'], function () {
    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;
    return gulp.src('./')
        .pipe(git.commit(message));
});

gulp.task('tag',['ci'], function() {
    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;
    return git.tag(v, message, null, function(err){});
});

gulp.task('push', ['tag'], function () {
    return gulp.src('./')
        .pipe(git.push('origin', 'master', function(err){
            if(err) throw err;
        }));
});

gulp.task('npm', ['push'], function (done) {
    npm.load({}, function(err){
        if( err ) throw  err;
        npm.commands.publish([], function(err, data){
            if( err ) throw err;
            done();
        });
    });

});

gulp.task('release', ['npm']);