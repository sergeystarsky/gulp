var 	gulp 	     = require ('gulp'), // require - подключение модуля который мы установили через nmp install
    	sass	     = require ('gulp-sass'), //поключаем препроцессинг sass
	browserSync  = require('browser-sync'), //автоматическое обновление всех браузеров при сохранении
    	concat       = require('gulp-concat'),   //сборка скриптов
	uglify       = require('gulp-uglifyjs'), // минимизируем, сжимаем js файлы
	cssnano      = require('gulp-cssnano'),  // минимизируем css файлы
	rename       = require('gulp-rename'),   //переименование файла
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
	gulp.watch('app/*.html', browserSync.reload); // следим за html файлами, при изменении и сохранении файлов обновляется браузер
	gulp.watch('app/js/**/*.js', browserSync.reload);// следим за js во всех поддерикториях,при изменении и сохранении файлов обновляется браузер
});

//task для сжатия скриптов
gulp.task('scripts', function() {
	return gulp.src([
	'app/libs/jquery/dist/jquery.min.js',
	'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
	]) //подключаем уже минифицированные файлы, перебираем в массиве
  	.pipe(plumber())   //ловим ошибки
	.pipe(concat('libs.min.js')) //конкатинируем файлы, собираем в кучу в файле libs.min.js
	.pipe(uglify())               //сжимаем файлы
	.pipe(gulp.dest('app/js'));   //выгружаем результат в данную деррикторию
});

gulp.task('css-libs', ['sass'], function() {  //запускаем sass в приоритете(поочередность потока) , сжимаем libs
	return gulp.src('app/css/libs.css')   // выбираем файл для сжатия
	.pipe(plumber())
	.pipe(cssnano())                       //сжимаем наш файл
	.pipe(rename({suffix: '.min'}))        //добавляем к файлу суффикс min
	.pipe(gulp.dest('app/css'));           //выгружаем в app/css
	
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
