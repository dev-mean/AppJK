<!DOCTYPE html>

<!--[if IE 9 ]><html class="ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html <?php language_attributes(); ?>><!--<![endif]-->

<head>

    <?php wp_head(); ?>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-64077181-1', 'auto');
      ga('send', 'pageview');

    </script>
</head>

<body id="<?php print get_stylesheet(); ?>" <?php body_class('ct-body'); ?>>

<div id="overflow-container" class="overflow-container">
    <a class="skip-content" href="#main"><?php _e('Skip to content', 'tracks'); ?></a>
<header id="site-header" class="site-header" role="banner">

    <?php

    $social_icon_setting = get_theme_mod('social_icons_display_setting');

    if( ( has_nav_menu( 'secondary' ) ) || // if secondary menu is set, or...
        ( get_theme_mod('search_input_setting') == 'show' ) || // if search bar is on, or...
        ( $social_icon_setting == 'header-footer' || $social_icon_setting == 'header' ) ) : // default is 'no', so if it is equal header & footer, or header display it

            echo "<div class='top-navigation'>";

                echo "<div class='container'>";

                    // add secondary menu if set
                    get_template_part( 'menu', 'secondary' );

                    // add search input if set
                    if(get_theme_mod('search_input_setting') == 'show'){
                        get_search_form();
                    }
                    // display social icons if set
                    if( (get_theme_mod('social_icons_display_setting') == 'header-footer') || (get_theme_mod('social_icons_display_setting') == 'header')){
                        ct_tracks_customizer_social_icons_output();
                    }

                echo "</div>";

            echo "</div>";
    endif; ?>
    <div class="container">

        <div id="title-info" class="title-info">
            <a href="http://www.uzomadozie.com" title="Uzoma Dozie"><span class="screen-reader-text">Uzoma Dozie</span><img class="logo" src="http://uzomadozie.com/blog/wp-content/uploads/2015/05/uzomalogo.png" alt="Uzoma Dozie"></a>
            <div id="keepsp_anim"></div>
        </div>

        <?php get_template_part( 'menu', 'primary' ); // adds the primary menu ?>
    </div><!-- .container -->
</header>
<div id="main" class="main" role="main">