var gulp = require ('gulp'), // require - подключение модуля который мы установили через nmp install
    sass = require ('gulp-sass'), //поключаем препроцессинг sass

 gulp.task('sass', function() {           //выполняем таск sass который преобразует sass в css
 	return gulp.src('app/sass/main.sass')   //берем из папок файл main.sass
	.pipe(sass())                           //выполняем таск sass  (преобразуем sass в css посредством gulp-sass) 
	.pipe(gulp.dest('app/css'))             // выводим результат в файл css(если указать main.css, то будет создан еще один файл, что не верно)
 });
//return gulp.src('app/sass/*.sass') выбираем все файлы, которые имеют расширение sass в директории sass
//return gulp.src('app/sass/**/*.sass') выбираем все файлы, которые имеют расширение sass в директории sass
//return gulp.src('!app/sass/main.sass') данный файл исключиться из выборки
