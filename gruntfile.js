module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
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