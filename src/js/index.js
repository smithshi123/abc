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

// $('.searchBox').on('mouseenter',function(){
//     $('.searchKeyWords').animate({
//         'display':'block',
//         'opacity':1
//        }
//     )})
// $('.searchBox').on('mouseleave',function(){
//     $('.searchKeyWords').stop(true).animate({
//         display:'none',
//         opacity:0
//        }
//     )})

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

/* $('.mainNav').on('mouseenter','li',function(){
    // console.log($(this).children().last('.subContent'))
    
    $(this).children().last('.subContent').css({
        'display':'block',
        'opacity':1
    })
        
})
$('.mainNav').on('mouseleave','li',function(){
    $(this).children().last('.subContent').css({
        'display':'none',
        'opacity':0
    })
})
 */
//轮播
            var mySwiper = new Swiper('.swiper-container', {
                // 如果需要自动轮播
                autoplay:true,//这里打开swiper---api查看就可以
    
                // direction: 'vertical', // 垂直切换选项（不写，默认是横向轮播）
                loop: true, // 循环模式选项（假设有3张图，希望第三张后面接的是第0张，这里就写true）
                
                // 如果需要小圆点
                pagination: {
                    el: '.swiper-pagination',
                },
                
                // 如果需要左右箭头
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                
                // 如果需要滚动条
                // scrollbar: {
                //     el: '.swiper-scrollbar',
                // }
            })      
 
 
