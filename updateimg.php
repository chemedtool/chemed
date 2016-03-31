<?php
$data = $_POST['data'];
$file = $_POST['fname'];
$data = str_replace("data:image/png;base64,","",$data);
$data = base64_decode($data);

$im = imagecreatefromstring($data);
$uploadHeight = imagesy($im);
$uploadWidth = imagesx($im);

$targetImage = imagecreatetruecolor( $uploadWidth, $uploadHeight );   
imagealphablending( $targetImage, false );
imagesavealpha( $targetImage, true );

imagecopyresampled( $targetImage, $im, 
                    0, 0, 
                    0, 0, 
                    $uploadWidth, $uploadHeight, 
                    $uploadWidth, $uploadHeight );
if ($im !== false) {
    header('Content-Type: image/png');
    imagepng($targetImage,'./library/'.$file.'.png');
    imagedestroy($im);
	echo "Success";
}
else {
    echo 'An error occurred.';
}
?>