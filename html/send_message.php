<?php
session_start();
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];
$captcha = $_POST["captcha"];
// echo $_SESSION['captcha']['code'];
// echo '<br>';
// echo $captcha;
if($name && $email && $message && $captcha){
	if($captcha == $_SESSION['captcha']['code']){
		$to = "devesh.uba@gmail.com";
		$subject = "Website contact message";
		$message = '<html><head><title>Message</title></head><body><table border="1" cellspacing="0"><tr><th style="padding:10px">Name</th><td style="padding:10px">'.$name.'</td></tr><tr><th style="padding:10px">Email</th><td style="padding:10px">'.$email.'</td></tr><tr><th style="padding:10px">Message</th><td style="padding:10px">'.$message.'</td></tr></table></body></html>';

		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

		// More headers
		$headers .= 'From: Contact <contact@uzomadozie.com>' . "\r\n";
		mail($to,$subject,$message,$headers);

		$response["success"] = true;
		$response["message"] = "Your message has been successfully received by me. Thank you.";
	} else {
		$response["success"] = false;
		$response["message"] = "Please fill correct captcha code";
	}
} else {
	$response["success"] = false;
	$response["message"] = "Please fill all the fields";
}

echo json_encode($response);
?>