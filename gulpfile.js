var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');
//编译scss
gulp.task('devscss', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('devscss'))
})

//起服务
gulp.task('devserver', function() {
        return gulp.src('src')
            .pipe(server({
                port: 9090,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === '/favicon.ico') {
                        return res.end('')
                    }
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    console.log(pathname);
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }))
    })
    //开发环境
gulp.task('dev', gulp.series('devscss', 'devserver', 'watch'))