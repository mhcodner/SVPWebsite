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
    <?php wp_head(); ?>
</head>
<body ng-cloak>

<header>

    <nav class="transparent z-depth-0">
        <div class="nav-wrapper">
            <div class="container">
                <a href="#" data-activates="nav-mobile" class="button-collapse top-nav full hide-on-large-only black-text"><i class="mdi-navigation-menu"></i></a>
                <a href="/" class="brand-logo">
                    <img src="<?php echo get_template_directory_uri() ?>/img/SVP_Logo_sm.png" alt="Logo">
                </a>
                <ul class="right hide-on-med-and-down" ng-controller="MenuController">
                    <li ng-repeat="item in menuItems" ng-class="{ active:isActive(item.url) }"><a class="black-text waves-effect waves-teal" ng-href="{{ item.url }}">{{ item.title }}</a></li>
                </ul>
                <ul id="nav-mobile" class="side-nav" ng-controller="MenuController">
                    <li ng-repeat="item in menuItems"><a class="waves-effect waves-teal" ng-class="{ active:isActive(item.url) }" ng-href="{{ item.url }}">{{ item.title }}</a></li>
                </ul>
            </div>
        </div>
    </nav>

</header>

<main>
    <div ng-hide="!title" class="container">
        <h1><a class="black-text" ng-bind="title">Sam Venn Photography</a></h1>
    </div>
    <!-- main content here -->
    <div class="view-animate-container">
        <div ng-view class="view-animate page-content"></div>
    </div>
</main>

<footer class="page-footer transparent" style="padding-top: 0;">
    <div class="footer-copyright transparent">
        <div class="container">
            <span class="grey-text darken-3">&copy; <?php echo date("Y"); ?> Sam Venn Photography</span>
            <div class="right" style="padding-top: 5px;">
                <a class="grey-text darken-3" href="https://www.facebook.com/pages/Sam-Venn-Photography/311302692214440">
                    <i class="fa fa-2x fa-facebook-square"></i>
                </a>
                <a class="grey-text darken-3" href="https://instagram.com/samvennphotography/">
                    <i class="fa fa-2x fa-instagram"></i>
                </a>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>