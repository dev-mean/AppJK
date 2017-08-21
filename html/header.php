<?php
    if(isset($page) && $page->id == 9){

    } else {
        $_SESSION["last_page"] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    }
?>
<body>
    <div class="container-fluid" style="padding:0; background:#CE001F; -webkit-box-shadow: inset 0px -5px 15px -9px rgba(0,0,0,0.75);
-moz-box-shadow: inset 0px -11px 15px -9px rgba(0,0,0,0.75);
box-shadow: inset 0px -5px 15px -9px rgba(0,0,0,0.75); border-bottom:1px solid #fff;">
        <div class="container" id="top-menu" style="">
            <div class="row" style="height:60px;">
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-4 col-sm-12 col-xs-12">
                            <div class="brand" style="padding:8px 0; font-size:11px;">
                                <a href="<?php echo STRSITE ?>" title="Foodvood Home Page"><img src="<?php echo STRSITE; ?>img/logow.png" style="width:220px; height:auto;" alt="Foodvood Logo"></a>
                            </div>
                        </div>
                         <div class="col-md-8 col-sm-12 col-xs-12">
                             <nav class="navbar navbar-default" role="navigation" >

                                    <!-- Brand and toggle get grouped for better mobile display -->
                                    <div class="navbar-header">
                                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                            <span class="sr-only">Toggle navigation</span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                        </button>
                                        <!-- navbar-brand is hidden on larger screens, but visible when the menu is collapsed -->
                                        <a class="navbar-brand" href="index.html"><?php echo $top_menu_name; ?></a>
                                    </div>
                                    <!-- Collect the nav links, forms, and other content for toggling -->
                                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                        <ul class="nav navbar-nav">
                                            <li><a href="<?php echo STRSITE; ?>" <?php echo ($top_menu == 'home')?'class="active"':'' ?> >Home</a></li>
                                            <li><a href="<?php echo get_page_url('menu') ?>" <?php echo ($top_menu == 'menu')?'class="active"':'' ?>>Lunch Menu</a></li>
                                            <li><a href="<?php echo get_page_url('all-recipes') ?>" <?php echo ($top_menu == 'all-recipes')?'class="active"':'' ?>>All Recipes</a></li>
                                            <li><a href="http://www.foodvood.com/blog/" >Blog</a></li>
                                            <li><a href="<?php echo get_page_url('faqs') ?>"<?php echo ($top_menu == 'faqs')?'class="active"':'' ?> >FAQ</a></li>
                                        </ul>
                                    </div>
                                    <!-- /.navbar-collapse -->

                                <!-- /.container -->
                            </nav>
                        </div>

                    </div>
                </div>
                <div class="col-md-3">
                    <div style="" class="top-buttons-div">
                        <div class="bask-box">
                            <?php if(!is_logged_in()){ ?>
                                <a href="<?php echo get_page_url('login'); ?>"><i class="fa fa-user"></i><br>Login/Sign Up</a>
                            <?php } else { ?>
                            <div class="dropdown">
                              <a class="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" style="padding:10px; cursor:pointer"><i class="fa fa-user"></i><br>
                                <?php echo (strlen($member->username) > 12)?substr($member->username, 0, 12).'..':$member->username;?>
                                <span class="caret hidden-xs"></span>
                              </a>
                              <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo get_page_url('profile') ?>">Profile</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo get_page_url('orderlist') ?>">Orders</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo get_page_url('wishlist') ?>">Wishlist</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo get_page_url('logout'); ?>">Logout</a></li>
                              </ul>
                            </div>
                            <?php } ?>
                        </div>
                         <div class="bask-box" style="">
                            <a href="<?php echo get_page_url('basket');?>" id="basket-link" class="pop-hide" data-container="body" data-placement="bottom" data-html="true" data-content=""><i class="fa fa-shopping-cart"></i><br>Basket (<span class="order-cart-count number"><?php echo $order->total_items; ?></span>)</a><br>
                                                        
                        </div>
                    </div>
                </div>

                
            </div>
        </div>

    </div>
     <div class="container-fluid" style="padding:0; background:#fff; margin-bottom:2px;box-shadow: 0 .32rem .32rem 0 rgba(0,0,0,.1); display:none;">
        <div class="container" style="">
            <div class="row">
                <div class="col-md-6 col-xs-12">
                     <nav class="navbar navbar-default" role="navigation" style="margin-top:5px" >

                            <!-- Brand and toggle get grouped for better mobile display -->
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <!-- navbar-brand is hidden on larger screens, but visible when the menu is collapsed -->
                                <a class="navbar-brand" href="index.html"><?php echo $top_menu_name; ?></a>
                            </div>
                            <!-- Collect the nav links, forms, and other content for toggling -->
                            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul class="nav navbar-nav">
                                    <li><a href="<?php echo STRSITE; ?>" <?php echo ($top_menu == 'home')?'class="active"':'' ?> >HOME</a></li>
                                    <li><a href="<?php echo get_page_url('menu') ?>" <?php echo ($top_menu == 'menu')?'class="active"':'' ?>>Lunch MENU</a></li>
                                    <li><a href="<?php echo get_page_url('all-recipes') ?>" <?php echo ($top_menu == 'all-recipes')?'class="active"':'' ?>>ALL RECIPES</a></li>
                                    <li><a href="<?php echo STRSITE.'blog/' ?>" >BLOG</a></li>
                                </ul>
                            </div>
                            <!-- /.navbar-collapse -->

                        <!-- /.container -->
                    </nav>
                </div>
                <div class="col-md-6 col-xs-12">
                    <div style="float:right; margin-top:10px; font-size:24px; color:#EF526B">
                       
                        <div style="float:left"><input type="text" placeholder="Search for Recipes..." style="font-size:12px; width:245px; padding:7px 15px;"></div>
                    </div>

                </div>
            </div>
        </div>

    </div>