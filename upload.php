
<?php
// In PHP versions earlier than 4.1.0, $HTTP_POST_FILES should be used instead
// of $_FILES.

$uploaddir = 'upload/';
$file = md5(uniqid()) . '.xml';
$uploadfile = $uploaddir . $file;

if (move_uploaded_file($_FILES['data']['tmp_name'], $uploadfile)) {
    echo "success-".$file;
} else {
    echo "failure-".$file;
}

/* echo 'Here is some more debugging info:';
print_r($_FILES);

print "</pre>"; */

?>