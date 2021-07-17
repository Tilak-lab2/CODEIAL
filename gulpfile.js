const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function (done) {
    console.log('minigying css..');
    gulp
      .src('./assets/scss/**/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest('./assets/css'));
  
    gulp
      .src('./assets/**/*.css')
    //   .pipe(uglifycss())
      .pipe(rev())
      .pipe(gulp.dest('./public/assets'))
      .pipe(
        rev.manifest({
          cwd: 'public',
          merge: true,
        })
      )
      .pipe(gulp.dest('./public/assets'));
    done();
  });
gulp.task('js',(done)=>{
console.log("Minifying JS")
gulp.src("./assets/**/*.js")
.pipe(uglify())
.pipe(rev())
.pipe(gulp.dest("./public/assets"))
.pipe(rev.manifest({
  cwd:"public",
  merge:true,
}))
.pipe(gulp.dest("./public/assets"))
done()

})
gulp.task('images',(done)=>{
  console.log("Minifying Images")
  gulp.src("./assets/**/*.*(png|jpg|gif|svg|jpeg))")
  .pipe(imagemin())
  .pipe(rev())
  .pipe(gulp.dest("./public/assets"))
  .pipe(rev.manifest({
    cwd:"public",
    merge:true,
  }))
  .pipe(gulp.dest("./public/assets"))
  done()
  
  })
gulp.task('clean:assets',(done)=>{
  del.sync("./assets/public")
  done()
})
gulp.task('build',gulp.series('clean:assets','css','js','images'),(done)=>{
  console.log("Building Assets")
  done()
})