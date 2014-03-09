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
	  files: ['Gruntfile.js', 'js/**/*.js', '!js/lib/*.js', 'test/**/*.js', '!test/lib/*.js'],
	  options:{
		globals:{
		  jQuery: true,
		  console: true,
		  module: true
		},
		//reporter: "jslintn",
		//reporterOutput: "jshintReport.xml",
		"-W033":true
	  }
	},
	 watch:{
      scripts:{
        files: 'js/**/*.js', 
        tasks: ['jshint']
      },
      styles:{
        files: 'css/**/*.less', 
        tasks: ['less:dev']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Définition des tâches Grunt
  grunt.registerTask('default', ['jshint','less'])

}