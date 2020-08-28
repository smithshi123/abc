<?php
/* 
    接收POST请求
    接收的参数有:username和password
    返回数据格式:
        {
            code:1,   //1表示成功,0表示失败
            msg:"错误信息",    //msg表示错误信息,如果code是0有这个键值对
            data:{        //data表示登陆成功的用户名,如果code是1有这个键值对
                username:"用户名"
            }   
        }
*/

//1 接收前端数据
$username = $_POST['username'];
$password = $_POST['password'];

//2 连接数据库
$conn = mysqli_connect('localhost','root','root','music');

//3 书写SQL语句(根据数据库里的表名user，查询数据库里表的字段username，password)
$sql = "SELECT * FROM `user` WHERE `username` = '$username' AND `password` = '$password' ";

//4 执行SQL语句
$result = mysqli_query($conn,$sql);

//5 解析查询结果
$data = mysqli_fetch_assoc($result);

if($data){
    $arr = array('code'=>1,'data'=>array('username'=>$username));
}else{
    $arr=array('code'=>0,'msg'=>'用户名或密码错误');
}

//6 返回json格式的数据
echo json_encode($arr);

?>