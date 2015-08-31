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

	// This theme uses wp_nav_menu() in one location.
	/*register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'samvennphoto' ),
	) );*/
}
endif; // samvennphoto_setup
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

	wp_enqueue_script( 'samvennphoto-angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-sanitize', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-sanitize.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-route', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-route.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-animate', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-animate.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-angular-resource', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-resource.min.js', array( ), '', true );
	wp_enqueue_script( 'samvennphoto-jquery', '//code.jquery.com/jquery-2.1.4.min.js', array( ), '', true );

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

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';
