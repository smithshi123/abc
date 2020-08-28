/* 
1.手机号码验证  “输入不合法，请重新输入正确的大陆手机号！”
2。图形验证：获取图形验证值进行比对(没有路径)
3.密码验证
4.重复密码验证  比对密码的值，
5.性别验证      判断是否点选，否——》请选择性别
6.出生日期验证  判断所有是否点选完毕，否——》请选择出生日期
7.我已阅读并同意：
8。完成所有即可注册
*/
//手机号码
$('#d_reg_mobile').on('blur',function(){
    var reg=/^(1|\+861)[3-8]{1}\d{9}$/;
    
    if(reg.test($('#d_reg_mobile').val())){
        $('.correct').css({'display':'block'})
        $('.tip_message').css({'display':'none'})
    }
    else{
        $('.error').css({'display':'block'})
        $('.error').text('输入不合法，请重新输入正确的大陆手机号！')
        $('.correct').css({'display':'none'})
        $('.tip_message').css({'display':'none'})
    }
})
//图形验证
$('#dregvCode').on('click',function(){
    $('#dregvCode').attr('src','https://mall.lqxshop.com/printpic/do_index?type=reg&regtype=1&'+ Math.random())

})
// 密码
/* 
正则表达式校验密码
1、密码必须由数字、字符、特殊字符三种中的两种组成；
2、密码长度不能少于8个字符；
(?!^\\d+$)不能全是数字
(?!^[a-zA-Z]+$)不能全是字母
(?!^[_#@]+$)不能全是符号（这里只列出了部分符号，可自己增加，有的符号可能需要转义）
.{8,}长度不能少于8位
合起来就是
(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}
 */



/* $('#d_reg_pwd1').on('blur',function(){
    var reg=/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;
    
    if(reg.test($('#d_reg_pwd1').val())){
        $('.correct').text('')
  
    }
    else{
        $('.error').text('输入不合法，请重新输入正确的大陆手机号！')
    }
})
 */



$('.submit input').click(function(){
    $.ajax({
        method:'post',
        url:'../php/register.php',
        data:{
            username:$('#d_reg_mobile').val(),
            password:$('#d_reg_pwd1').val()
        },

        success:function(data){
//            console.log(data)
            if(data.code==1){
                //跳到登录页面
                location.href="../pages/login.html"
            }else{
                alert(data.msg)
            }
        },
        dataType:'json'
    })
})


    // 置顶
    $(document).scroll(function(){//不写$('html')    
    if($(this).scrollTop()>=300){
        $('.slideBar').css({'display':'block'})
        $('.slideBar button').css({'display':'block'})
    }else{
        $('.slideBar').css({'display':'none'})
        $('.slideBar button').css({'display':'none'})
    }
})
$('.slideBar').click(function(){
    //回到顶部
    $('html').stop(true).animate({
        scrollTop:0,
    },600)
    //置顶按钮隐藏
    $('.slideBar button').css({'display':'none'})
})

//搜索框显示隐藏
$('.searchBox').on('mouseenter',function(){
    $('.searchKeyWords').css({'display':'block','opacity':'1'})
})
$('.searchBox').on('mouseleave',function(){
    $('.searchKeyWords').css({'display':'none','opacity':'0'})
})

//nav移入显隐
$('.mainNav').on('mouseenter','li',function(){
    //移入元素中class带“subContent”的子元素
    $(this).children('.subContent').css({
        'display':'block',
        'opacity':1
    })       
})
$('.mainNav').on('mouseleave','li',function(){
    $(this).children('.subContent').css({
        'display':'none',
        'opacity':0
    })
})