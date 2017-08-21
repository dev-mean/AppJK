<?php
	define('DB_HOST', 'localhost');
    define('DB_USER', 'uzoma');
    define('DB_PASSWORD', 'uzoma@1987');
    define('DB_DATABASE', 'blog');

    $link = mysql_connect( DB_HOST, DB_USER , DB_PASSWORD );
	if(!$link) {
		die('Failed to connect to server: ' . mysql_error());
	}
	
	$db = mysql_select_db(DB_DATABASE);
	if(!$db) {
		die("Unable to select database");
	}

    
?>