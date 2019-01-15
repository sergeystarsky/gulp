var 	gulp = require ('gulp'), // require - подключение модуля который мы установили через nmp install
    	sass = require ('gulp-sass'), //поключаем препроцессинг sass
	browserSync  = require('browser-sync'), //слежение за обновлениями
    
    
    
 gulp.task('sass', function() {           //выполняем таск sass который преобразует sass в css
 	return gulp.src('app/sass/main.sass')   //берем из папок файл main.sass
	.pipe(sass())                           //выполняем таск sass  (преобразуем sass в css посредством gulp-sass) 
	.pipe(gulp.dest('app/css'))             // выводим результат в файл css(если указать main.css, то будет создан еще один файл, что не верно)
 });
//return gulp.src('app/sass/*.sass') выбираем все файлы, которые имеют расширение sass в директории sass
//return gulp.src('app/sass/**/*.sass') выбираем все файлы, которые имеют расширение sass в директории sass
//return gulp.src('!app/sass/main.sass') данный файл исключается из выборки
//return gulp.src('[!app/sass/main.sass', 'app/sass/**/*.sass]') через массив выбираем все файлы sass кроме main.sass
//return gulp.src('app/sass/*.+(scss|sass)') выбираем все scss и все sass файлы в дериктории sass 

//процесс слижения	
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'],  function() {//сначала стартует 'browser-sync', 'css-libs' (в обязаетльном порядке выполняет sass), далее watch, scripts запускаем до запуска сервера
	gulp.watch('app/sass/**/*.sass', ['sass']); //следим за sass файлами во всех поддерикториях sass
	gulp.watch('app/*.html', browserSync.reload); // следим за html файлами
	gulp.watch('app/js/**/*.js', browserSync.reload);// следим за js во всех поддерикториях
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false //убираем лого при перезагрузке
	});
});
