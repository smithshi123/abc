//总计
// 获取选中框对象
var checkboxs = document.getElementsByName('goodsSelect')
var jiesuan = document.querySelector('#total_price b')
function total() {
    //总价
    var sum = 0
    //遍历出所有的数据
    for (var i = 0; i < checkboxs.length; i++) {
        // console.log(checkboxs[i].parentNode.parentNode.lastElementChild.previousElementSibling.previousElementSibling.innerHTML.slice(1))
        //判断当前对象是否被选中
        if (checkboxs[i].checked) {
            //获取当前商品的小计
            var zis = checkboxs[i].parentNode.parentNode.lastElementChild.previousElementSibling.previousElementSibling.innerHTML//￥1267
            var price = zis.slice(1)
            sum += parseInt(price)//此处没有 parseInt，会出现01267597，0是sum，后面数字是商品小计，会直接拼接
        }
    }
    //把计算结果赋值给总计位置
    jiesuan.innerHTML = sum
}

// 全选
$('#selectAll').click(function () {
    for (var i = 0; i < $("input[name*='goodsSelect']").length; i++) {
        //判断全选框是否被选中
        if (selectAll.checked) {//对象.属性,为什么这么写
            //单选的所有选框元素选中为真
            $("input[name*='goodsSelect']")[i].checked = true
        } else {
            //单选的所有选框元素选中为假
            $("input[name*='goodsSelect']")[i].checked = false
        }
    }
    total() 
})

//单选
$('.wrapper').on('click', "input[name*='goodsSelect']", function () {
    if($("input[name*='goodsSelect']")){
        var a=0 //统计选中框选中的次数
        for (var i = 0; i < $("input[name*='goodsSelect']").length; i++) {
            //判断全选框是否被选中
            if ($("input[name*='goodsSelect']")[i].checked) {
                a++
            } 
        }
        if(a==$("input[name*='goodsSelect']").length){
            selectAll.checked = true
        }else{           
            selectAll.checked = false
            }
    }
    total() 
})

//全删
$('.wrapper').on('click', '.clearCar', function () {
    for (var i = $("input[name*='goodsSelect']").length - 1; i >= 0; i--) {
        //console.log($("input[name*='goodsSelect']")[i])//获取到的是dom元素 
        //判断该商品是否被选中
        if ($("input[name*='goodsSelect']")[i].checked) {
            //thead和tbody删除
            $(this).parent().prev().children().eq(0).remove()
            // 促销活动块区删除，为什么删这个时，下面的包邮块区也会删掉？
            $(this).parent().next().remove()
            //包邮块区删除
            $(this).parent().next().next().remove()
            //让总计归0，上面的i是大于等于，所以这里要渲染两次
            $(this).parent().prev().children().last().children().children().children().children().first().text('￥' + 0)
        }
    }
})

// 加（解决点击1个，两个商品都加上了的问题，运用事件委托+this）
$('tbody').on('click', '.btnAdd', function () {
    var val = $(this).prev().val()
    val++
    //给输入框重新赋值
    $(this).prev().attr("value", val)
    // 获取单价
    var price = $(this).parent().prev().prev().text()
    // 计算小计
    var sum = parseFloat(val) * parseFloat(price.slice(1))
    //给小计赋值
    $(this).parent().prev().text('￥' + sum)
    total() 
})

// 减（解决点击1个，两个商品都减了的问题，运用事件委托+this）
$('tbody').on('click', '.btnReduction', function () {
    var val = $(this).next().val()
    if (val <= 1) {
        val = 1
    } else {
        val--
    }
    //给输入框重新赋值
    $(this).next().attr("value", val)
    // 获取单价
    var price = $(this).parent().prev().prev().text()
    // 计算小计
    var sum = parseFloat(val) * parseFloat(price.slice(1))
    //给小计赋值
    $(this).parent().prev().text('￥' + sum)
    total() 
})

//删除一行
$('tbody').on('click', '.del', function () {
    $(this).parent().parent().remove()
})

// 去结算
$('.wrapper').on('click', '.settle', function () {
    // var totalPrice=$(this).parent().prev().last().children().children().children().last().prev().text()

    
    // var totalPrice=$(this).parent().prev().last().children().last().children().children().children().children().last().children().last().prev().text()
    var totalPrice=$('#total_price').children().text()
    $('#total_price').children().text(totalPrice)

    if(totalPrice == "0"){//两等，0加引号
        alert("你还没有购买商品，请重新选择")
    }else{
        //确认框
        if(confirm("你确定要购买这些商品吗？")){
            alert("已支付："+totalPrice+"元")
            //遍历所有商品
            for(var i=checkboxs.length-1;i>=0;i--){
                //判断当前商品是否被选中
                if(checkboxs[i].checked){
                    //获取要删除的商品
                    var goods=checkboxs[i].parentNode.parentNode//tr
                    //根据父节点来删除当前子元素
//                    goods.parentNode.removeChild(goods)
                    goods.remove()
                }
            }
        }else{
            alert("我现在后悔了，不买了")
        }
    }
})

//继续购物，跳转到首页
$('.wrapper').on('click', '.continueBuy', function () {
    location.href="./i.html"
})

//total()//放在这里调用时机不对

/* 
1. 增加商品：
打开详情页，
点击“立即购买”，公共样式的购物车标示块会自动生成数量标示（1，2，3，。。。），即id="shop"数字发生变化；本页更新为购物车页面；商品勾选好，显示好数量，总价。底部的促销及包邮情况生成。

点击“加入购物车”，公共样式的购物车标示块会自动生成数量标示（1，2，3，。。。），即id="shop"数字发生变化；点击购物车的标示块，本页更新为购物车页面；商品未勾选，显示好数量，总价未计，底部的促销即包邮情况不生成/出现。
*/

//查询并显示购物车
function showCart(){
    $.ajax({
        url:'../php/showlist.php',
        dataType:'json',
        success:function(res){
            //凡是发ajax请求，出错打印res，打开network，--》name
            // console.log(res)

            $.each(res.data,function(index,item){
                $('tbody').append(`
                <tr>
                <td>
                    <input type="checkbox" name="goodsSelect" istaozu="0" isgiftgoods="0" goodssn="t0001674000000"
                        recid="3182412">
                </td>
                <td>
                    <a href="/goods-t0001674000000.html">${item.product_id}</a>
                </td>
                <td>
                    <a href="https://mall.lqxshop.com/goods-t0001836000000.html">
                        <img src="${item.product_img}"
                            width="50" height="50" alt="">
                    </a>
                    <h2 class="in_b">
                        <a href="/goods-t0001674000000.html">
                        ${item.product_name}
                        <p>颜色: 图片色</p>
                    </h2>
                </td>
                <td class="fw">￥678.00</td>
                <td class="fw">￥${item.product_price}</td>
                <td class="fw">￥597</td>
                <td>
                    <a href="javascript:;" class="btnReduction in_b">-</a>
                    <input type="text" value="${item.product_num}"  class="goodsNum in_b tc">
                    <a href="javascript:;" class="btnAdd in_b">+</a>
                </td>
                <td>
                    <a href="javascript:;" class="del">删除</a>
                </td>
            </tr>
                `)
            })
        }
    })
}
showCart()

//删除商品
$('tbody').on('click','.del',function(){
    $.ajax({
        url:'../php/interface/delwq.php',
        dataType:'json',
        data:{
            id:$(this).parent().parent().children().eq(1).text(),
        },
        success:function(res){
            if(res.code){
                showCart()
            }
        }
    })
})
                
$('.btnAdd').click(function(){
    $.ajax({
        url:"../php/interface/updatewq.php",
        dataType:'json',
        data:{
            type:'add',
            id:$(this).parent().parent().children().eq(1).text(),
        },
        success:function(res){
            if(res.code){
                alert('商品增加成功')
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