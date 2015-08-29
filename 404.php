<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="MyApp">
<head>
    <meta charset="utf-8">
    <title>404 Page Not Found</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='//fonts.googleapis.com/css?family=Raleway:200' rel='stylesheet' type='text/css'>
    <?php wp_head(); ?>
</head>
<body>

<div class="container">
    <div id="content">

        <article id="post-0" class="error404">
            <header class="entry-header">
                <h1 class="entry-title"><?php _e('This is somewhat embarrassing, isn&rsquo;t it?', 'WP-Skeleton'); ?></h1>
            </header>

            <div class="entry-content">
                <p><?php _e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching, or one of the links below, can help.', 'WP-Skeleton'); ?></p>

                <?php get_search_form(); ?>

            </div>
            <!-- .entry-content -->

        </article>
        <!-- #post-0 -->

    </div>
    <!-- #content -->
</div>
<!-- #primary -->

<?php wp_footer(); ?>
</body>
</html>
