<?php
include('tweet/TweetPHP.php');
$TweetPHP = new TweetPHP(array(
  'consumer_key'              => 'Aid8wJIxT9XoXDHbz3sUu7Gra',
  'consumer_secret'           => 'DACkmTZMi5g2WjsCNidFDdvnF1JFAhetJSbB2UHy46yNTAqk8z',
  'access_token'              => '1951411668-8hmpZoQGH93aiWUBGx7CjKVcLuUU02bolljHg0z',
  'access_token_secret'       => 'M8Uzul9imCGVFiQheF0DfKRHcXdkwlUicsKUTwjhQu4e8',
  'twitter_screen_name'       => 'uzoma_diamond'
));
echo $TweetPHP->get_tweet_list();

$tweet_array = $TweetPHP->get_tweet_array();

foreach ($tweet_array as $tweet) {
	echo $tweet["text"].'<br>';
}
?>