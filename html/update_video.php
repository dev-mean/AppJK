<?php
	require_once("config.php");
	$videoId = mysql_real_escape_string($_POST["videoId"]);
	mysql_query("UPDATE flickr set value = '$videoId' where id = 2 ");
?>