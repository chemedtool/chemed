<?php
ob_start();
$db = new mysqli('localhost', 'root', '', 'users');

mysql_select_db('users');
// Define $myusername and $mypassword 
$myusername=$_POST['myusername']; 
$mypassword=$_POST['mypassword']; 


// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);

$sql="SELECT password FROM admin WHERE username='$myusername'";
$result = $db->query($sql);
$row = $result->fetch_assoc();

// If result matched $myusername and $mypassword, table row must be 1 row
if(password_verify($mypassword, $row['password'])){

// Register $myusername, $mypassword and redirect to file "login_success.php"
session_start();
$_SESSION['myusername']=$myusername;
$_SESSION['mypassword']=$mypassword; 
echo "Success-".$myusername;
}
else {
echo "Wrong Username or Password";
}
//ob_end_flush();
?>
