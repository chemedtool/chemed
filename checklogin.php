 <?php
 session_start();
 if(isset($_SESSION['myusername'])&& isset($_SESSION['mypassword']))
 {echo "true";}
 else 
 {echo "false";}
 ?>