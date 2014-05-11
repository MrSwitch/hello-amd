module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			js: {
				options: {
					findNestedDependencies: true,
					baseUrl: './src/',
					preserveLicenseComments: false,
					optimize: 'none',
//					optimize: 'uglify2',
//					mainConfigFile: './src/require.config.js',
					name: 'index',
					out: 'dist/index.js',
					wrap: {
							start: "(function(window,document,undefined){",
							end: "})(window,document);"
					},
					//A function that will be called for every write to an optimized bundle
					//of modules. This allows transforms of the content before serialization.
					onBuildWrite: function (moduleName, path, contents) {
							//Always return a value.
							//This is just a contrived example.
							return contents.replace(/console\.log\((.*?)\)/g, '');
					}/*,
					onModuleBundleComplete: function (data) {
						var fs = require('fs'),
							amdclean = require('amdclean'),
							outputFile = data.path;
						fs.writeFileSync(outputFile, amdclean.clean({
							'filePath': outputFile
						}));
					}*/
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js'],//, 'test/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					console: true,
					module: true,
					document: true
				},
				ignores : [
					'bower_components/**'
				]
			}
		},

		replace:    {
			html:  {
				src:  ['./src/index.html'],
				dest: './dist/index.html',
				replacements: []
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('default', ['jshint', 'requirejs', 'replace']);

};