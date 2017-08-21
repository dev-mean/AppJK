<?php
	require_once("phpFlickr.php");
	require_once("config.php");
	$f = new phpFlickr("0cd7ee853f0d835dcbcec98d52aa1594");
	$f->enableCache("fs", "cache");
	$username = 'uzoma.dozie';
	$result = $f->people_findByUsername($username);
	$nsid = $result["id"];
	$user_url = $f->urls_getUserPhotos($nsid);
	$photos = $f->people_getPublicPhotos($nsid, NULL, NULL, 6, 1);
	$str = '';
	foreach ($photos['photos']['photo'] as $photo) {
	    $str .= "<a  href=\"".$user_url.$photo['id']."\" title=\"View $photo[title]\" target=\"_blank\">";
	    $str .= "<img src=\"" . $f->buildPhotoURL($photo, "Square") .  "\" alt=\"$photo[title]\" />";
	    $str .= "</a>";
	}

	if($str != '' && $str){
		mysql_query("UPDATE flickr set value = '$str' where id = 1 ");
	}
?>