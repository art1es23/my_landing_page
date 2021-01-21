var gulp = require("gulp");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

function convertScss(done) {
  gulp
    .src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: "compressed",
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());

  done();
}

function browser(done) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchScss() {
  gulp.watch("./scss/**/*", convertScss);
}

function watchFiles() {
  gulp.watch("./scss/**/*", convertScss);
  gulp.watch("./**/*.html", browserReload);
  gulp.watch("./**/*.js", browserReload);
  gulp.watch("./**/*.php", browserReload);
}

gulp.task("default", gulp.parallel(watchFiles, browser));
