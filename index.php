<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="MyApp" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#"
                                      xmlns:fb="https://www.facebook.com/2008/fbml">
<head>
    <base href="/">
    <meta charset="utf-8">
    <title ng-bind="title">Sam Venn Photography</title>
    <meta property="og:title" content="{{ title }}"/>
    <meta property="og:type" content="article"/>
    <meta property="og:image" content="http://128.199.107.48/wp-content/themes/SVPWebsite/img/SVP_Logo_sm.png"/>
    <meta property="og:site_name" content="Sam Venn Photography"/>
    <meta property="og:description" content="Photographer from Sydney"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <?php wp_head(); ?>
</head>
<body>

<header>

    <div class="title-container">
        <div class="cd-logo">
            <a href="/">
                <img src="<?php echo get_template_directory_uri() ?>/img/SVP_Logo_sm.png" alt="Logo">
            </a>
        </div>
        <div class="title">
            <a href="/">
                Sam Venn Photography
            </a>
        </div>
    </div>

    <nav class="cd-main-nav-wrapper hide-large">
        <ul ng-controller="MenuController" id="main-nav" class="cd-main-nav">
            <li ng-repeat="item in menuItems" ><a ng-class="{ active:isActive(item.url) }" ng-href="{{ item.url }}">{{ item.title }}</a></li>
        </ul>
    </nav>

    <a href="#" class="cd-nav-trigger">Menu<span></span></a>

</header>

<main class="cd-main-content">
    <aside class="sidebar hide-small">
        <ul ng-controller="MenuController" class="side-nav">
            <li ng-repeat="item in menuItems" ><a ng-class="{ active:isActive(item.url) }" ng-href="{{ item.url }}">{{ item.title }}</a></li>
        </ul>
    </aside>
    <!-- main content here -->
    <div class="view-animate-container">
        <div ng-view class="view-animate page-content" ng-cloak></div>
    </div>
</main>

<footer>
    <div class="container">
        <hr/>
        &copy; <?php echo date("Y"); ?> Sam Venn Photography
        <div class="u-pull-right">
            <a href="https://www.facebook.com/pages/Sam-Venn-Photography/311302692214440"><i
                    class="fa fa-2x fa-facebook-square"></i></a>
            <a href="https://instagram.com/samvennphotography/"><i class="fa fa-2x fa-instagram"></i></a>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>