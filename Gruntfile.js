/*
 * grunt-css-sprite
 * https://github.com/laoshu133
 *
 * Licensed under the MIT license.
 */

var path = require('path');
var compass_importer = require('compass-importer');
var fs = require('fs');

module.exports = function(grunt){
	grunt.initConfig({
		//Auto sprite
		sprite: {
			options: {
				// sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
				imagepath: 'slice/',
				// 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
				spritedest: 'css/',
				// 替换后的背景路径，默认 ../images/
				spritepath: 'img/',
				// 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
				padding: 2,
				// 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
				newsprite: false,
				// 给雪碧图追加时间戳，默认不追加
				spritestamp: false,
				// 在CSS文件末尾追加时间戳，默认不追加
				cssstamp: false,
				// 默认使用二叉树最优排列算法
				algorithm: 'binary-tree',
				// 默认使用`pngsmith`图像处理引擎
				engine: 'pngsmith',
				
				ver:140
			},
			autoSprite: {
				files: [{
					//启用动态扩展
					expand: true,
					// css文件源的文件夹
					cwd: 'sass-css/',
					// 匹配规则
					src: '**/*.css',
					//导出css和sprite的路径地址
					dest: 'css/',
					// 导出的css名
					ext: '.css'
				}]
			}
		},
	    watch: {
	      sass: {
	        files: ['sass/{,*/}*.{scss,sass}'],
	        tasks: ['sass']
	      },
	      options: {
	        // Sets livereload to true for livereload to work 
	        // (livereload is not covered in this article)
	        livereload: true,
	        spawn: false
	      }
	    },
		jshint: {
			all: [ 'Gruntfile.js', 'tasks/*.js' ]
		},
        useminPrepare: {
            file: 'dist/**/**.{css,html}',
            options: {
                dest: 'dist/'  
            }
        },
		usemin:{
            html: 'dist/demo/**/*.html',
            css: 'dist/css/**/*.css',
            options: {
                assetsDirs: ['dist','dist/css','dist/images']
            }
        },
        clean:{
            build: {
                src: ["dist"]
            }
        },
        copy: {
            file:{expand: true, src: ['{demo,css,images,js}/**/*'], dest: 'dist/'}
        },
        rev: {
            options: {
                algorithm: 'md5',
                length: 8
            },  
            assets: {
                files: [{
                    src: [
                        'dist/**/*.{css,jpg,jpeg,gif,png,js,ttf,svg,eot,woff}'
                    ]   
                }]  
            }   
        }
	});

	// 载入任务
    var MODULE_PATH = __dirname+"/node_modules";
    require(path.join(MODULE_PATH, 'matchdep'))
    .filterDev('grunt-*', path.join(__dirname, 'package.json'))
    .forEach(function(name){
        grunt.task.loadTasks(path.join(MODULE_PATH, name, 'tasks'));
    });

	// 声明别名
	grunt.registerTask('default', ["clean","copy","rev",'useminPrepare','usemin']);
};
