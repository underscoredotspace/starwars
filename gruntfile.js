module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        beautify: true
      },
      build: {
        src: 'app/src/dotSpace.starWars.js',
        dest: 'dist/dotSpace.starWars.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('min', ['uglify'])
  grunt.registerTask('default', []);
};