<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="MyApp" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#"
                                      xmlns:fb="https://www.facebook.com/2008/fbml">
<head>
    <base href="/">
    <meta charset="utf-8">
    <title ng-bind="title">Sam Venn Photography</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/css/materialize.min.css"  media="screen,projection"/>
    <?php wp_head(); ?>
</head>
<body ng-cloak>

<header>

    <nav class="top-nav blue-grey darken-3">
        <div class="container">
            <div class="nav-wrapper">
                <a class="page-title" ng-bind="title">Sam Venn Photography</a>
            </div>
        </div>
    </nav>
    <a href="#" data-activates="nav-mobile" class="button-collapse top-nav full hide-on-large-only"><i class="mdi-navigation-menu"></i></a>
    <ul id="nav-mobile" class="side-nav fixed" style="left: 0;" ng-controller="MenuController">
        <li class="logo blue-grey lighten-2">
            <a href="/" id="logo-container" class="brand-logo">
                <img src="<?php echo get_template_directory_uri() ?>/img/SVP_Logo_sm.png" alt="Logo">
            </a>
        </li>
        <li class="bold" ng-repeat="item in menuItems">
            <a class="waves-effect waves-teal" ng-class="{ active:isActive(item.url) }" ng-href="{{ item.url }}">{{ item.title }}</a>
        </li>
    </ul>

</header>

<main>
    <!-- main content here -->
    <div class="view-animate-container">
        <div ng-view class="view-animate page-content"></div>
    </div>
</main>

<footer class="page-footer" style="padding-top: 0;">
    <div class="footer-copyright blue-grey darken-3">
        <div class="container">
            &copy; <?php echo date("Y"); ?> Sam Venn Photography
            <div class="right" style="padding-top: 5px;">
                <a class="grey-text text-lighten-4" href="https://www.facebook.com/pages/Sam-Venn-Photography/311302692214440">
                    <i class="fa fa-2x fa-facebook-square"></i>
                </a>
                <a class="grey-text text-lighten-4" href="https://instagram.com/samvennphotography/">
                    <i class="fa fa-2x fa-instagram"></i>
                </a>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>