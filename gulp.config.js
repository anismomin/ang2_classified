module.exports = function() {
	var config = {
		dev: './src/',
		
		clientConf: './src/client/app/tsconfig.json',
		client: './src/client/',
		
		clientTs: './src/client/app/**/**/*.ts',
		clientHtml: './src/client/app/**/*.html',
		clientImages: ['./src/client/assets/images/**/*.jpeg','./src/client/assets/images/**/*.jpg', './src/client/assets/images/**/*.png'],
		favicon: './src/client/favicon.ico',
		clientSvgImages: './src/client/assets/images/**/*.svg',
		clientScss: ['./src/client/assets/scss/**/*.scss', './src/client/assets/partials/*.scss'],
		clientCompScss: './src/client/app/**/**/*.scss',
		clientJs: './src/client/assets/js/**/*.js',


		serverConf: './src/server/tsconfig.json',
		devServer: './src/server/',
		devServerTs: './src/server/**/*.ts',

		built : './built/',
		builtClient: './built/client/',
		builtLibs: './built/client/assets/libs/',
		builtApp: './built/client/app/',
		images: './built/client/assets/images/',
		scss: './built/client/assets/css/',
		compScss: './built/client/app/',
		jsLibs: './built/client/assets/js/',		
		uploads: './built/client/uploads',
		builtServer: './built/server/',

		indexPage: 'src/client/index.html'
		
	};
	
	return config;
}