"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var webp = require("gulp-webp");
var del = require("del");
var minify = require("gulp-csso");

gulp.task("webpjpg", function () {
  return gulp.src("source/img/*.jpg")
  .pipe(webp({quality: 85}))
  .pipe(gulp.dest("source/img"));
});

gulp.task("clean", function () {
  return del("docs");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("docs"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("docs/"));
});

gulp.task ("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("style", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("docs/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("docs/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{sass,scss}", gulp.series("style"));
  gulp.watch("source/*.html").on("change", server.reload);
});

  gulp.task("build", gulp.series("clean", "copy", "style", "html"));
  gulp.task("start", gulp.series("build", "serve"));


