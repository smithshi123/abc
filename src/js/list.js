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