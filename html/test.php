<?php
$to = "vishu.iitd@gmail.com";
$subject = "Contact Message";
$txt = "Hello world!";
$headers = "From: info@uzomadozie.com" . "\r\n";

mail($to,$subject,$txt,$headers);
?>
