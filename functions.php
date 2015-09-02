<?php
/**
 * SamVennPhoto functions and definitions.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package SamVennPhoto
 */

if ( ! function_exists( 'samvennphoto_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function samvennphoto_setup() {
	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	remove_action('wp_head', 'wp_generator');
	remove_action('wp_head', 'wlwmanifest_link');
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wp_shortlink_wp_head');
	remove_action('set_comment_cookies', 'wp_set_comment_cookies');

	remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);

	add_filter('the_generator', '__return_false');
	add_filter('show_admin_bar','__return_false');
	add_filter('embed_oembed_html', 'oembed_html', 9999, 4);

	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
}
endif; // samvennphoto_setup
function oembed_html($html, $url, $attr, $post_id) {
	return '<div class="video-wrapper">' . $html . '</div>';
}
add_action( 'after_setup_theme', 'samvennphoto_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function samvennphoto_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'samvennphoto_content_width', 640 );
}
add_action( 'after_setup_theme', 'samvennphoto_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function samvennphoto_scripts() {
	wp_enqueue_style( 'samvennphoto-style', get_stylesheet_uri() );
	wp_enqueue_style( 'samvennphoto-normalize', get_template_directory_uri() . '/css/normalize.css' );
	wp_enqueue_style( 'samvennphoto-skeleton', get_template_directory_uri() . '/css/skeleton.css' );
	wp_enqueue_style( 'samvennphoto-loading-bar', get_template_directory_uri() . '/css/loading-bar.css' );

	wp_enqueue_script( 'samvennphoto-jquery', get_template_directory_uri() . '/js/vendor/jquery-2.1.4.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular', get_template_directory_uri() . '/js/vendor/angular.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-sanitize', get_template_directory_uri() . '/js/vendor/angular-sanitize.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-route', get_template_directory_uri() . '/js/vendor/angular-route.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-animate', get_template_directory_uri() . '/js/vendor/angular-animate.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-resource', get_template_directory_uri() . '/js/vendor/angular-resource.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-loading-bar', get_template_directory_uri() . '/js/vendor/loading-bar.js', array( ), '', true );

	wp_enqueue_script( 'samvennphoto-js', get_template_directory_uri() . '/js/app.js', array(), '', true );
	wp_enqueue_script( 'samvennphoto-main', get_template_directory_uri() . '/js/main.js', array(), '', true );

	// Variables for app script
	wp_localize_script( 'samvennphoto-js', 'samvennphotoJS',
		array(
			'themeuri' => get_template_directory_uri(),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'samvennphoto_scripts' );
