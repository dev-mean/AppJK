<?php
	session_start();
	include('simple-php-captcha.php');
    $_SESSION['captcha'] = simple_php_captcha();
    $response = array();
    $response["image"] = $_SESSION['captcha']['image_src'];
    $response["code"] = $_SESSION['captcha']['code'];
    echo json_encode($response);
?>