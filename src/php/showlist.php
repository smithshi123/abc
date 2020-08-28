<?php
require('./model/_connect.php');

//书写sql语句
$sql = "SELECT * FROM cart";

//执行sql语句
$result = mysqli_query($conn,$sql);
if(mysqli_num_rows($result)>0){	
	$arr = mysqli_fetch_all($result,MYSQL_ASSOC);
	echo json_encode(array("code"=>1,"data"=>$arr));
}else{	
	echo json_encode(array("code"=>0));
}
//这里没有参数，无需参数。但在实际工作中是需要参数的，因为整个购物车表记录的不是一个人的，有张三，李四，王五。。。。等人的，这时就可能通过用户名来查询（同名情况还需另看）。这里只存了个人的，所以无需参数，直接查询整张表（ "SELECT * FROM cart"）

?>