</div> <!-- .main -->

<footer id="site-footer" class="site-footer" role="contentinfo">
    <h3 style="text-transform:none; font-style: italic;">
        <a href="<?php echo esc_url(home_url()); ?>">Keep Sparkling ...</a>
    </h3>
    <?php if(get_bloginfo('description') && ( get_theme_mod('tagline_display_setting') == 'header-footer' ) || ( get_theme_mod('tagline_display_setting') == 'footer' )){ ?>
        <p class="site-description"><?php bloginfo('description'); ?></p>
    <?php } ?>
    <?php
        // add footer menu if set
        get_template_part( 'menu', 'footer' );
    ?>
    <?php
        // add social icons if set
        if( (get_theme_mod('social_icons_display_setting') == 'header-footer') || (get_theme_mod('social_icons_display_setting') == 'footer')){
            ct_tracks_customizer_social_icons_output();
        }
    ?>
	<?php get_template_part('sidebar','footer'); ?>
	<br><br><br><br>
</footer>

<?php if( get_theme_mod('additional_options_return_top_settings') != 'hide' ) { ?>
	<button id="return-top" class="return-top">
		<i class="fa fa-arrow-up"></i>
	</button>
<?php } ?>

<?php
    // add the background image if being used
    if(get_theme_mod( 'ct_tracks_background_image_setting')){
        echo "<div class='background-image'></div>";
    }
?>

</div><!-- .overflow-container -->

<?php wp_footer(); ?>
<script type="text/javascript">
jQuery(document).ready(function() {
    keeploop();
});

function keeploop(){
    jQuery( "#keepsp_anim" ).css('width',0);
    jQuery( "#keepsp_anim" ).show();
    jQuery( "#keepsp_anim" ).animate({
        width: "+=170"
      }, 2000, function() {
         setTimeout(function(){ jQuery('#keepsp_anim').fadeOut("slow", function(){
             setTimeout(keeploop(), 3000);
         }) }, 5000);
    });
}
</script>
</body>
</html>