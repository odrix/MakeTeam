module.exports = function(grunt) {

  // Configuration de Grunt
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	less:{
	   dev:{
		   options: {
			path: "/css/"
		   },
		   files: {
				"./css/team.css": "./css/team.less"
		   }
		}
	},
	jshint:{
	  files: ['Gruntfile.js', 'js/**/*.js', '!js/lib/*.js', 'test/src/*.js', 'test/spec/*.js'],
	  options:{
		globals:{
		  jQuery: true,
		  console: true,
		  module: true
		},
		//reporter: "jslintn",
		//reporterOutput: "jshintReport.xml",
		"-W033":true,
        "-W099":true,
        "-W083":true
	  }
	},
    jasmine: {
        test: {
            src: ['js/**/*.js', '!js/lib/*.js'],
            options: {
                vendor: 'js/lib/**/*.js',
                specs: 'test/*.spec.js'
            }
        }
    },
    watch:{
        scripts:{
            files: 'js/**/*.js',
            tasks: ['jshint', 'jasmine']
        },
        styles:{
            files: 'css/**/*.less',
            tasks: ['less:dev']
        }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Définition des tâches Grunt
  grunt.registerTask('default', ['jshint','less'])

}