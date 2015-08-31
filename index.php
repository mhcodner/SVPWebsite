<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="MyApp" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="https://www.facebook.com/2008/fbml">
<head>
    <base href="/">
    <meta charset="utf-8">
    <title ng-bind="title">Sam Venn Photography</title>
    <meta property="og:title" content="Sam Venn Photography"/>
    <meta property="og:type" content="article"/>
    <meta property="og:image" content="http://128.199.107.48/wp-content/themes/SVPWebsite/img/SVP_Logo.png"/>
    <meta property="og:site_name" content="Sam Venn Photography"/>
    <meta property="og:description" content="Photographer from Sydney"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='//fonts.googleapis.com/css?family=Raleway:200:400' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <?php wp_head(); ?>
</head>
<body>

<div class="container">

    <header>

        <div class="title-container">
            <div class="cd-logo">
                <a href="/">
                    <img src="<?php echo get_template_directory_uri() ?>/img/SVP_Logo.png" alt="Logo">
                </a>
            </div>
            <div class="title">
                <a href="/">
                    Sam Venn Photography
                </a>
            </div>
        </div>

        <nav class="cd-main-nav-wrapper">
            <ul ng-controller="MenuController" class="cd-main-nav">
                <li><a ng-class="{ active:isActive('/') }" href="/">Home</a></li>
                <li><a ng-class="{ active:isActive('/about/') }" href="/about">About</a></li>
                <li><a ng-class="{ active:isActive('/contact/') }" href="/contact">Contact</a></li>
                <li><a ng-class="{ active:isActive('/gallery/') }" href="/gallery">Gallery</a></li>
            </ul>
        </nav>

        <a href="#" class="cd-nav-trigger">Menu<span></span></a>

    </header>

    <main class="cd-main-content">
        <!-- main content here -->
        <div class="view-animate-container">

            <div ng-view class="view-animate" ng-cloak></div>

        </div>
    </main>

    <footer>
        &copy; <?php echo date("Y"); ?> Sam Venn Photography
        <div class="u-pull-right">
            <a href="https://www.facebook.com/pages/Sam-Venn-Photography/311302692214440"><i class="fa fa-2x fa-facebook-square"></i></a>
            <a href="https://instagram.com/samvennphotography/"><i class="fa fa-2x fa-instagram"></i></a>
        </div>
    </footer>

</div>

<?php wp_footer(); ?>
</body>
</html>