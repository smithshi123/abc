// 在这里书写cyrshop这个项目的打包配置文件

/* 
    gulp里面提供的方法
        1 src()
            ==>用来找到你要打包的文件的
            ==>语法: gulp.src('你要打包的文件路径')
            ==>返回值:是一个二进制流,就可以继续去调用别的方法
        2 pipe()
            ==>他是用来帮你做事情的
            ==>语法: 二进制流.pipe(你要做的事情)
            ==>返回值:又是一个二进制流,可以继续使用方法
        3 dest()
            ==>用来写入文件
            ==>语法: gulp.dest("你要写入的文件夹路径")
            ==>你要把已经压缩好的代码放在哪一个文件夹里面
            ==>如果没有你指定的文件夹,会自动创建这个文件夹放进去
        4 parallel()
            ==>用来并行执行多个任务
            ==>语法: gulp.parallel(你定义好的任务1,你定义好的任务2,...)
            ==>他就会把这几个任务都给你执行了
            ==>返回值:一个任务流
            ==>只要这个返回值一执行,就能把你准备好的几个任务同时开始执行
        5 series()
            ==>用来逐个执行多个任务的
            ==>语法: gulp.series(任务1,任务2,...)
            ==>返回值:一个任务流
            ==>只要这个返回值一执行,就会把你准备好的几个任务逐一执行
            ==>前一个任务完成以后再执行后面一个任务
        6 watch()
            ==>用来监控文件变化的
            ==>语法: gulp.watch('你要监控的文件目录',你要执行的任务)

*/

//1 导入gulp这个第三方模块
const gulp = require('gulp');

//2.1 导入gulp-cssmin这个第三方模块
const cssmin = require('gulp-cssmin');

//2.2 导入gulp-autoprefixer这个第三方模块
const autoprefixer = require('gulp-autoprefixer');

//3.1 导入gulp-uglify这个第三方模块
const uglify = require('gulp-uglify');

//3.2 导入gulp-babel这个第三方模块
const babel = require('gulp-babel');

//4.1 导入gulp-htmlmin这个第三方模块
const htmlmin = require('gulp-htmlmin')

//7.1 导入del这个第三方模块
const del = require('del')

//9.1 导入gulp-webserver这个第三方模块
const webserver = require("gulp-webserver")



//2.3 写一个打包css的方法
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')   //找到src目录里面下的css目录下的所有后缀为.css的文件
    .pipe(autoprefixer())           //把css代码自动添加前缀
    .pipe(cssmin())   //压缩css代码
    .pipe(gulp.dest('./dist/css'))  //压缩完毕以后的css代码放在dist目录中的css文件夹里面
}

//3.3 书写一个打包js的方法
const jsHanlder = ()=>{
    return gulp.src('./src/js/*.js')   //找到src目录里面下的js目录下的所有后缀为.js的文件
    .pipe(babel({
        presets: ['@babel/env']
    }))    //转码es6转换成es5了,就可以压缩了
    .pipe(uglify())  //压缩
    .pipe(gulp.dest('./dist/js'))  //把压缩完毕的放入文件夹
}

//4.2 书写一个打包html的方法
const htmlHandler = ()=>{
    return gulp.src(['./src/pages/*.html','./src/pages/*.htm'])   //找到src目录里面下的pages目录下的所有后缀为.html的文件
    .pipe(htmlmin({
        "removeAttributeQuotes":true,   //移除属性上的双引号
        "removeComments":true,    //移除注释
        "collapseBooleanAttributes":true,  //把值为布尔值的属性简写
        "collapseWhitespace":true, //移除所有空格,变成一行代码
        "minifyCSS":true, //把页面里面的style标签里面的css样式也去空格
        "minifyJS":true,  //把页面里面的script标签里面的js代码也去空格
    })) //压缩
    .pipe(gulp.dest('./dist/pages'))  //把压缩完毕的放到一个指定目录
}

//5.1 书写一个移动images文件夹的方法
const imgHandler = ()=>{
    return gulp.src('./src/images/**')  //images文件夹下的所有文档
    .pipe(gulp.dest('./dist/images'))   //放到指定的目录就可以了
}

//6.1 书写一个移动lib文件夹的方法
const libHandler = ()=>{
    return gulp.src('./src/lib/**')  //lib文件夹下的所有文档
    .pipe(gulp.dest('./dist/lib'))   //放到指定的目录就可以了


}

//7.2 书写一个任务,自动删除dist目录
const delHandler = ()=>{
    return del(['./dist'])
}

//8.1 自动监控文件
//监控src下面的文件,只要一修改,就执行对应的任务
//比如src下面的css文件夹,只要里面的文件一修改,我就执行一下cssHandler这个任务
const watchHandler = ()=>{
    //监控着src下的css下的所有csswe你按,只要一发生变化,就会自动执行一遍cssHandler这个任务
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHanlder);
    gulp.watch('./src/pages/*.html',htmlHandler);
    gulp.watch('./src/lib/**',libHandler);
    gulp.watch('./src/images/**',imgHandler)
}

//9 书写一个配置服务器的任务
// 在开发过程中直接把我写的代码在服务器上打开
// 因为要一边写一边修改,一边测试
// 因为gulp是基于node的
// 这里就使用node给我们开启一个服务器,不是apache,也不是nginx
// 自动刷新:当dist目录里面的代码改变以后,就会自动刷新浏览器

const serverHandler = ()=>{
    return gulp.src('./dist') //找到我要打开网页的文件夹,把这个文件夹当做网站根目录
    .pipe(webserver({//需要一些配置项
        port:'8080', //端口号,0-65535,尽量不使用0-1023
        open:'./pages/index.html', //你默认打开的首页,从dist下面根目录开始书写
        livereload:true,//自动刷新浏览器,热重启
        //所有的代理配置都在proxies里面
        proxies:[
            //每一个代理配置就是一个对象
            {
                source:"/weather",//源,你的代理标识符
                target:'https://way.jd.com/jisuapi/weather',//目标,你要代理的地址
            }
        ]
    }))
}




// //2.4 导出这个任务
// module.exports.css = cssHandler;
// //3.4 导出这个任务
// module.exports.js = jsHanlder;
// //4.3 导出这个任务
// module.exports.html = htmlHandler;
// //5.2 导出这个任务
// module.exports.img = imgHandler;
// //6.2 导出这个任务
// module.exports.lib = libHandler

// //7.3 导出这个任务
// module.exports.del = delHandler;
// //8.2 导出这个任务
// module.exports.watch = watchHandler;
// //10.3 单独导出sassHanlder 
// module.exports.sass = sassHandler;


// 导出一个默认任务default,那么就不需要导出:css,js,html,img,lib,del,watch
// 执行任务的语法: gulp 任务名
// 如果任务名是default,执行任务的时候可以省略任务名
// 任务执行顺序: del->[css,js,html,img,lib,sass]->watch
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHanlder,htmlHandler,imgHandler,libHandler),
    serverHandler,
    watchHandler
)






