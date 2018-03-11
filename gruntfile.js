module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    // Очищаем папку build
    clean: {
      build: ["build"]
    },
    includereplace: {
      html: {
        src: "*.html", 
        dest: "build/",
        expand: true, 
        cwd: "src/"
      }
    },
    // Копируем файлы из папки source в папку build
    copy: {
      js: {
        expand: true,
        cwd: "src/js/",
        src: ["**"],
        dest: "build/js/",
      },
      img: {
        expand: true,
        cwd: "src/img/",
        src: ["**"],
        dest: "build/img/"
      },
      font: {
        expand: true,
        cwd: "src/_html_block/font/",
        src: ["**"],
        dest: "build/font/"
      }
    },
    // Улучшаем LESS файл (отступы, порядок свойств и прочее)
    csscomb: { 
      style: {
        expand: true,
        src: ["src/_html_block/**/*.less"]
      }
    },
    // Конвертируем LESS файлы в CSS
    less: {
      style: {
        files: {
          "build/css/main.css": ["src/_html_block/main.less"]
        }
      }
    },
    // Добавляем префиксы
    autoprefixer: {
      options: {
        browsers: ["last 10 version", "ie 10"]
      },
      style: {
        src: "build/css/main.css"
      }
    },
    // Объединяем медиа-выражения
    cmq: {
      style: {
        files: {
          "build/css/main.css": ["build/css/main.css"]
        }
      }
    },
    // Минимизиурем CSS
    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "build/css/main.min.css": ["build/css/main.css"]
        }       
      }
    },
    // Объединяем несколько JS файлов
    concat: {
      start: {
        src: [
          "src/_html_block/**/*.js"
        ],
        dest: "build/js/script.js"
      }
    },
    // Минимизируем js файлы
    uglify: {
      start: {
        files: {
          "build/js/script.min.js": ["build/js/script.js"]
        }
      }
    },
    // Минимизируем html
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
          "build/index.min.html": "build/index.html"      
        }
      }
    },
    // Отслеживаем изенения в указанных файлах и выполняем описанные действия
    watch: {
      style: {
        files: ["src/_html_block/**/*.less"],
        tasks: ["style"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scripts: {
        files: ["src/js/*.js", "src/_html_block/**/*.js"],
        tasks: ["js"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images: {
        files: ["src/img/**"],
        tasks: ["img"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: [
                "src/*.html", 
                "src/_html_block/**/*.html"
                ],
        tasks: ["includereplace:html"],
        options: {
          spawn: false,
          livereload: true
        },
      },
      font: {
        files: ["src/_html_block/font/**"],
        tasks: ["font"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  // Мета-таск - передаем в массиве последовательность запуска тасков
  grunt.registerTask("production",[
    "clean",
    "csscomb",
    "less",
    "autoprefixer",
    "cmq",
    "cssmin",
    "concat",
    "uglify",
    "copy",
    "includereplace",
    "htmlmin"
  ]);
  grunt.registerTask("build",[
    "clean",
    "less",
    "autoprefixer",
    "cssmin",
    "concat",
    "uglify",
    "copy",
    "includereplace",
    "htmlmin",
    "watch"
  ]);
  grunt.registerTask("js",[
    "concat",
    "uglify",
    "copy:js"
  ]);
  grunt.registerTask("style",[
    "less",
    "autoprefixer",
    "cssmin"
  ]);
  grunt.registerTask("img",[
    "copy:img",
    "less",
    "autoprefixer",
    "cmq",
    "cssmin"
  ]);
  grunt.registerTask("font",[
    "copy:font"
  ]);
}