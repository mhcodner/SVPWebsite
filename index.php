<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="MyApp">
<head>
	<base href="/wordpress/" >
	<meta charset="utf-8">
	<title>{{ title }}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href='//fonts.googleapis.com/css?family=Raleway:200' rel='stylesheet' type='text/css'>
	<?php wp_head();?>
</head>
<body>

<div class="container">

	<header>

		<div class="cd-logo"><a href="/wordpress/"><img src="<?php echo get_template_directory_uri() ?>/img/SVP_Logo.png" alt="Logo"></a></div>

		<nav class="cd-main-nav-wrapper">
			<ul ng-controller="MenuController" class="cd-main-nav">
				<li><a ng-class="{ active:isActive('/wordpress/') }" href="/wordpress/">Home</a></li>
				<li><a ng-class="{ active:isActive('/wordpress/about') }" href="/wordpress/about">About</a></li>
				<li><a ng-class="{ active:isActive('/wordpress/services') }" href="/wordpress/services">Services</a></li>
				<li><a ng-class="{ active:isActive('/wordpress/blog') }" href="/wordpress/blog">Blog</a></li>
			</ul>
		</nav>

		<a href="#0" class="cd-nav-trigger">Menu<span></span></a>

	</header>

	<main class="cd-main-content">
		<!-- main content here -->
		<div class="view-animate-container">

			<div ng-view class="view-animate"></div>

		</div>
	</main>

</div>

<?php wp_footer(); ?>
</body>
</html>