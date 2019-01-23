var 	gulp 	     = require ('gulp'), // require - подключение модуля который мы установили через nmp install
    	sass	     = require ('gulp-sass'), //поключаем препроцессинг sass
	browserSync  = require('browser-sync'), //автоматическое обновление всех браузеров при сохранении
    	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'), // минимизируем js файлы
	cssnano      = require('gulp-cssnano'),  // минимизируем css файлы
	rename       = require('gulp-rename'),
	del 	     = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber	     = require('gulp-plumber'),
	notify	     = require('gulp-notify');
    
    
    
 gulp.task('sass', function() {           //выполняем таск sass который преобразует sass в css
 	return gulp.src('app/sass/main.sass')   //берем из папок файл main.sass
	.pipe(sass())                           //выполняем таск sass  (преобразуем sass в css посредством gulp-sass) 
	.pipe(gulp.dest('app/css'))             // выводим результат в файл css(если указать main.css, то будет создан еще один файл, что не верно)
	.pipe(browserSync.reload({stream: true}))//	 
 });
//return gulp.src('app/sass/*.sass') выбираем все файлы, которые имеют расширение sass в директории sass
//return gulp.src('app/sass/**/*.sass') выбираем все файлы, которые имеют расширение sass в директории sass
//return gulp.src('!app/sass/main.sass') данный файл исключается из выборки
//return gulp.src('[!app/sass/main.sass', 'app/sass/**/*.sass]') через массив выбираем все файлы sass кроме main.sass
//return gulp.src('app/sass/*.+(scss|sass)') выбираем все scss и все sass файлы в дериктории sass 

//процесс слежения, параметры с скобках выполнятся в приоритете	
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'],  function() {//сначала стартует 'browser-sync', 'css-libs' (в обязаетльном порядке выполняет sass), далее watch, scripts запускаем до запуска сервера
	gulp.watch('app/sass/**/*.sass', ['sass']); //если просиходят изменения в файлах, мы выполняем таск sass, указываем его в квадратных скобках, через запятую 
	gulp.watch('app/*.html', browserSync.reload); // следим за html файлами
	gulp.watch('app/js/**/*.js', browserSync.reload);// следим за js во всех поддерикториях
});

//При запуске выдает url для использования при просмотре например на мобильно устройстве
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'  //Папка которая является сервером
		},
		notify: false //убираем лого при перезагрузке
	});
});    
