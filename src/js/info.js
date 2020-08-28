

//详情右侧tab选项功能 ，点中标题的字体变红，对应内容显示，其余标题原色（黑色），对应内容隐藏
$('.informationTitle').on('click', 'li', function () {
    $(this).addClass('current')
        .siblings().removeClass('current')
        .parent().next().children().removeClass('active')
        .eq($(this).index()).addClass('active')
})
// .informationTitle li.current  红色字体的class
//.informationTitle li  黑色字体的class


//放大镜
var box = document.getElementsByClassName('detailsLeft')[0]//最大盒子
var small = document.getElementsByClassName('goodsMainPic')[0]//小图盒子
var mask = document.getElementsByClassName('jqZoomPup')[0]//小图遮罩
var big = document.getElementsByClassName('jqZoomWindow')[0]//大图盒子
var bigImg = big.children[0]//大图片
var bottomSmall = document.getElementsByClassName('goodsScrollPic1')[0]// 左边图片底部盒子

$('.goodsMainPic').on('mouseenter', function () {
    $('.jqZoomPup').css({ 'display': 'block', 'cursor': 'crosshair' })
    $('.jqZoomWindow').css({ 'display': 'block' })
})

$('.goodsMainPic').on('mouseleave', function () {
    $('.jqZoomPup').css({ 'display': 'none' })
    $('.jqZoomWindow').css({ 'display': 'none' })
})

//3 鼠标在small里面移动,mask跟随
small.onmousemove = function (e) {
    //提到跟随,一定跟鼠标坐标有关,一定需要事件对象
    e = window.event || e;
    //三个坐标:鼠标相对页面的位置,鼠标相对窗口的位置,鼠标相对被点击元素的位置
    //要让mask在box里面定位,就要求到鼠标距离box边缘的距离:鼠标距离页面的距离-box距离页面的距离
    // var x = e.pageX - box.offsetLeft;
    var x = e.pageX - box.offsetLeft;
    // var y = e.pageY - box.offsetTop;
    var y = e.pageY - box.offsetTop;
    //鼠标距离页面的距离 = 鼠标相对窗口的位置 + 滚动的距离

    //为了让鼠标在mask的中间
    x = x - mask.offsetWidth / 2;
    y = y - mask.offsetHeight / 2;
    //边界检测
    if (x < 0) {
        x = 0
    }
    if (x > box.offsetWidth - mask.offsetWidth) {
        x = box.offsetWidth - mask.offsetWidth;
    }

    if (y < 0) {
        y = 0
    }
    if (y > box.offsetHeight - mask.offsetHeight - bottomSmall.offsetHeight) {
        y = box.offsetHeight - mask.offsetHeight - bottomSmall.offsetHeight - 10
    }

    mask.style.left = x + "px"
    mask.style.top = y + "px"

    //计算bigImg左移和上移的距离（小图和大图两者等比关系）
    //   x/box的宽度 = bigImg左移的距离/bigImg的宽度
    //   y/box的高度 = bigImg上移的距离/bigImg的高度


    var left = -x / box.offsetWidth * bigImg.offsetWidth;
    var top = -y / box.offsetHeight * bigImg.offsetHeight;

    bigImg.style.left = left + "px";
    bigImg.style.top = top + "px";

}

// 底部图切换
//我要买：加减（注意赋值跟拿到文本内容的值的数据类型）

$('#num_add').click(function () {
    var stock = $(this).prev().text()
    var val = $(this).prev().prev().val()
    val++
    //加完后给输入框赋值
    $(this).prev().prev().val(val)
    // stock=parseInt(stock)
    if (val > stock) {
        $(this).prev().prev().val(stock)
        // val=stock
    }
})

$('#num_delete').click(function () {
    var val = $(this).next().val()
    // Number(val)
    val--
    $(this).next().val(val)


    if (val <= 0) {
        //赋值
        $(this).next().val(1)
    }

})




// 增加商品(加入到购物车)
$('#add_detail_shop_cart2').click(function () {
    //console.log($('.goodsPrice').children().eq(2).text().slice(6))
    console.log($('.goodsPrice').children().eq(0).text()),
    $.ajax({
            url:'../php/addwq.php',
            dataType:'json',
            data:{
                id:$('.goodsPrice').children().eq(2).text().slice(6),
                name:$('.goodsPrice').children().eq(0).text(),
                img:'../images/01.jpg',
                num:$('#choose_num').val(),
                price:$('.officialPrice').children().eq(0).children().text(),
            },
            
            success:function(res){
                console.log(res)
                if(res.code){
                    alert('商品加入成功')
                    console.log(res.code)
                }else{
                    alert('商品加入失败')
                }
            }
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