/*!
 * base-ui Gruntfile
 * Copyright 2015 Andrew Castro
 * Licensed under MIT (https://github.com/suiteappdev/base-ui/blob/master/LICENSE)
 */

module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
        distPath:       'dist/',
        docsAssetsPath: 'docs/assets/',
        docsDistPath:   'docs/dist/',
        docsPath:       'docs/',
        srcPath:        'sass/',
    },

    banner: '/*!\n' +
            ' * =====================================================\n' +
            ' * base-ui v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %> (https://github.com/suiteappdev/base-ui/blob/master/LICENSE)\n' +
            ' *\n' +
            ' * v<%= pkg.version %> designed by @suiteappdev.\n' +
            ' * =====================================================\n' +
            ' */\n',

    /*clean: {
      dist: ['<%= meta.distPath %>/assets', '<%= meta.docsDistPath %>/assets']
    },*/

    sass: {
      options: {
        sourcemap: 'none',
        style: 'expanded',
        unixNewlines: true
      },
      core: {
        src: 'sass/baseui.scss',
        dest: '<%= meta.distPath %>assets/css/<%= pkg.name %>.css'
      }
		},

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            '<%= meta.distPath %>assets/css/*.css'
          ]
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: '<%= meta.distPath %>/assets/'
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: '*' // keep all important comments
      },
      docs: {
        src: [
          '<%= meta.docsAssetsPath %>css/docs.css',
          '<%= meta.docsAssetsPath %>css/pygments-manni.css',
          '<%= meta.docsAssetsPath %>css/normalize.css'
        ],
        dest: '<%= meta.docsAssetsPath %>css/docs.min.css'
      }
    },

    watch: {
      options: {
        hostname: 'localhost',
        livereload: true,
        port: 8000
      },
      css: {
        files: '<%= meta.srcPath %>**/*.scss',
        tasks: ['dist-css', 'copy']
      }
    },
    connect: {
      site: {
        options: {
          base: 'dist/',
          hostname: 'localhost',
          keepalive: true,
          livereload: true,
          open: true,
          port: 8000
        }
      }
    }
  });


  // Load the plugins
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Tasks
  grunt.registerTask('dist-css', ['sass', 'usebanner', 'cssmin']);
  grunt.registerTask('dist', ['dist-css', 'copy']);
  grunt.registerTask('server', ['dist','connect', 'watch']);

  grunt.registerTask('default', ['dist']);
};
