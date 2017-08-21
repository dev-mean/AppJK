<?php
  include('top.php');
  include('config.php');
?>
<div class="bg_full">
	<i></i>
</div>
<div class="container-fluid main-container">
	<div class="container container-top">
		<div class="main_logo">
			<a href="javascript:;" onclick="do_close()"><img src="img/uzomalogo.png"></a>
			<div id="keepsp_anim" class="back1">
			</div>
		</div>

		<div class="back2"></div>
		<div class="back3"></div>
		<div class="back4"></div>

		<div class="uzoma_diamond">
			<img src="img/uzomadiamond.png">
		</div>
		<div id="about">
			<div class="row">
				<div class="col-xs-6"><h1>ABOUT</h1></div>
				<div class="col-xs-6"><a href="javascript:;" class="pull-right about-close"><img src="img/cancel.png"></a></div>
			</div>
			<div class="about_text">
				<p>Diligence, vibrancy and youthful exuberance of Mr. Uzoma Dozie, CEO Diamond Bank PLC, make him not only an inspiring leader but also a remarkable individual.</p>
				<p>He is known for his calm demeanor, multi-tasking abilities and an eternal yearning to learn more.</p>

				<p>Known for his down to earth approach, Mr. Dozie began his journey with Diamond Bank in 1998 and since then he has played several roles with utmost perfection.</p>

				<p>He started working there as an Assistant Manager and Head of the Bank's Oil and Gas Group, where he expanded the Bank's Oil and Gas businesses.</p>

				<p>Mr. Dozie used his strong background in Retail Banking, Management, and Organizational Behaviour to set up the Personal Banking Group at the Bank.</p>

				<p>Combining his passion for technology with his insights and operational expertise, he fostered a culture of innovation at the Bank. He resurrected e-banking, and introduced Diamond Mobile app. He also launched Diamond Y'ello which offers a safe and easy means of opening and operating a full bank account from the convenience of MTN Mobile phones.</p>

				<p>Mr. Dozie believes that the success of retail banking lies in its convenience; accessibility and cost effectiveness for the customers.</p>
			</div>
		</div>

		<div id="contact">
			<div class="row">
				<div class="col-xs-6"><h1>CONTACT</h1></div>
				<div class="col-xs-6"><a href="javascript:;" class="pull-right contact-close"><img src="img/cancel.png"></a></div>
			</div>
			<div class="contact_text">
				<p></p>
				<form class="form-horizontal">
					<div class="form-body">
						<div class="form-group">
							<label class="col-md-3 control-label">Your Name</label>
							<div class="col-md-9 message_form">
								<input type="text" name="name" id="name" class="form-control" placeholder="Your Name">
								<span class="error"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-3 control-label">Your Email</label>
							<div class="col-md-9 message_form">
								<input type="text" name="email" id="email" class="form-control" placeholder="Your Email">
								<span class="error"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-3 control-label">Your Message</label>
							<div class="col-md-9 message_form">
								<textarea name="message" id="message" class="form-control" placeholder="Your Message"></textarea>
								<span class="error"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-3 control-label">Input Code</label>
							<div class="col-md-4 message_form">
								<input type="text" name="code" id="code" class="form-control" placeholder="Captcha Code">
								<span class="error"></span>
							</div>
							<div class="col-md-4 message_form">
								<img src="" id="captcha_image">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-3 control-label"></label>
							<div class="col-md-9 message_form">
								<button type="button" class="btn" id="contact_btn" onclick="contact_submit()">Send</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		
	<div class="main_container">
		<div class="social-icons">
			    <a href="https://ng.linkedin.com/in/uzomadozie" target="_blank"><img src="img/linkedin.png"></a>
			    <a href="https://twitter.com/uzoma_diamond" target="_blank"><img src="img/twitter.png" class="spmarginLeft"></a>
			    <a href="https://www.youtube.com/channel/UCSZbeyI1cNTqcV13Zea8u8A" target="_blank"><img src="img/youtube.png" class="spmarginLeft"></a>
		</div>
		<div class="links_div">
			<div class="about" style="background:url(img/about.jpg)">
				<div class="content">ABOUT</div>
			</div>
			<div class="work" style="background:url(img/diary.jpg)">
				<a href="http://www.uzomadozie.com/blog" target="_blank" style="color:inherit">
					<div class="content">BLOG</div>
				</a>
			</div>
			<div class="contact" style="background:url(img/iphone.jpg)">
				<div class="content"><span style="letter-spacing:1px">CONTACT</span></div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="twitter_block">
			<div class="twitter-icon">
				<img src="img/twitter-icon.png">
			</div>
			<div class="quotes">
				<?php
					$TweetPHP = new TweetPHP(array(
					  'consumer_key'              => 'Aid8wJIxT9XoXDHbz3sUu7Gra',
					  'consumer_secret'           => 'DACkmTZMi5g2WjsCNidFDdvnF1JFAhetJSbB2UHy46yNTAqk8z',
					  'access_token'              => '1951411668-8hmpZoQGH93aiWUBGx7CjKVcLuUU02bolljHg0z',
					  'access_token_secret'       => 'M8Uzul9imCGVFiQheF0DfKRHcXdkwlUicsKUTwjhQu4e8',
					  'twitter_screen_name'       => 'uzoma_diamond'
					));
					echo $TweetPHP->get_tweet_list();
					?>
			</div>
			<div class="clear"></div>

		</div>
		<div class="footer">
			<div class="latest_blog">
				<div class="head"><span>FROM THE <span class="heading-light">BLOG</span></span></div>
				<?php
					$blog_sql = mysql_query("SELECT ID, post_title, post_date,post_name  from wp_posts where post_type = 'post' and post_status = 'publish' order by post_date desc limit 4 ");
					while ($row = mysql_fetch_array($blog_sql)) {
						?>
							<div  class="blog-contain">
								<div class="normal-font">
									<a href="http://www.uzomadozie.com/blog/<?php echo $row["post_name"] ?>" target="_blank"><?php echo $row["post_title"] ?><br><!-- <span><?php echo date("d-M-y H:i A", strtotime($row["post_date"])) ?></span> -->
									</a>
								</div>
							</div>
						<?php
					}
				?>				
			</div>
			<div class="latest_photos">
				<div class="head"><span>LATEST <span class="heading-light">PHOTOS</span></span></div>

				<div class="flickr_feed">
					<?php
					$blog_sql = mysql_query("SELECT value  from flickr where id = 1  limit 1 ");
					while ($row = mysql_fetch_array($blog_sql)) {
						echo $row["value"];
					}
				?>	
				</div>
			</div>
			<div class="latest_videos">
				<div class="head"><span>LATEST <span class="heading-light">VIDEOS</span></span></div>
				<div class="video-contain">
					<?php
						$blog_sql = mysql_query("SELECT value  from flickr where id = 2  limit 1 ");
						while ($row = mysql_fetch_array($blog_sql)) {
							$video =  $row["value"];
						}
					?>	
					<iframe src="https://www.youtube.com/embed/<?php echo $video ?>" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</div>
		<div class="clear:both;"></div>

	</div>

</div>
<div class="container-fluid footer-dark">
	<div class="container" style="position:relative">
		<div class="hr-line"></div>

		<div class="foot-head">
			<span>Tech Turks</span>
		</div>

		<div class="row videos-footer">
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/H7UlqM2scKM" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/LfIcaKSUXIM" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/iuxWq9oM8j0" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>



		</div>

		<div class="row videos-footer hidden">
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/xlKN7NaCyuI" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/gUx0jB-LHZY" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/fplpsE1iMYs" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>



		</div>

		<div class="row videos-footer">
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/a9LhqtqXmgI" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/cR3VUtt2Jvs" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/k7XD1Bd98Ag" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>



		</div>

		<div class="row videos-footer">
			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/uvT2FQrqQwU" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/wbhi8mZhyys" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="footer-video">
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/Va3AHaVBnuM" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>
		<div style="text-align:center">
			<a href="http://www.uzomadozie.com/blog/category/techturks/" class="view-all">View All</a>
		</div>
	</div>
</div>
<?php
  include('bottom.php');
?>