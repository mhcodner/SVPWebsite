<?php
/**
 * SamVennPhoto functions and definitions.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package SamVennPhoto
 */

if (!function_exists('samvennphoto_setup')) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function samvennphoto_setup()
    {
        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'rsd_link');
        remove_action('wp_head', 'wp_shortlink_wp_head');
        remove_action('set_comment_cookies', 'wp_set_comment_cookies');

        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);

        add_filter('the_generator', '__return_false');
        add_filter('show_admin_bar', '__return_false');
        add_filter('embed_oembed_html', 'oembed_html', 9999, 4);

        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');

        $GLOBALS['content_width'] = apply_filters('samvennphoto_content_width', 640);

        // Create 'Featured' category if it doesn't exist
        if (file_exists(ABSPATH . '/wp-admin/includes/taxonomy.php')) {
            require_once(ABSPATH . '/wp-admin/includes/taxonomy.php');
            if (!get_cat_ID('Featured')) {
                wp_create_category('Featured');
            }
        }

        // Create necessary pages to prevent 404
        if (isset($_GET['activated']) && is_admin()) {

            $htaccess_rules = [
                '# allow social media crawlers to work by redirecting them to a server-rendered static version on the page',
                'RewriteCond %{REQUEST_URI} !^/wp-content/',
                'RewriteCond %{QUERY_STRING} !^json=1$',
                'RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit/[0-9]|Twitterbot|Pinterest|Google.*snippet|Googlebot|redditbot|bingbot)',
                'RewriteRule ^(.*)$ /wp-content/themes/SVPWebsite/static-page.php?slug=$1 [L]'
            ];
            add_htaccess($htaccess_rules);

            $new_page_title = 'About';
            $new_page_content = '';
            $new_page_template = ''; //ex. template-custom.php. Leave blank if you don't want a custom page template.

            //don't change the code bellow, unless you know what you're doing

            $page_check = get_page_by_title($new_page_title);
            $new_page = array(
                'post_type' => 'page',
                'post_title' => $new_page_title,
                'post_content' => $new_page_content,
                'post_status' => 'publish',
                'post_author' => 1,
            );
            if (!isset($page_check->ID)) {
                $new_page_id = wp_insert_post($new_page);
                if (!empty($new_page_template)) {
                    update_post_meta($new_page_id, '_wp_page_template', $new_page_template);
                }
            }

        }
    }
endif; // samvennphoto_setup
add_action('after_setup_theme', 'samvennphoto_setup');

/**
 * Enqueue scripts and styles.
 */
function samvennphoto_scripts()
{
    wp_enqueue_style('samvennphoto-style', get_stylesheet_uri());

    wp_enqueue_script('samvennphoto-main', get_template_directory_uri() . '/js/bundle.js', array(), '', true);

    // Variables for app script
    wp_localize_script('samvennphoto-js', 'samvennphotoJS',
        array(
            'themeuri' => get_template_directory_uri(),
        )
    );
}

add_action('wp_enqueue_scripts', 'samvennphoto_scripts');

/**
 * Inserts an array of strings into a file (.htaccess ), placing it between
 * BEGIN and END markers. Replaces existing marked info. Retains surrounding
 * data. Creates file if none exists.
 *
 * @param array|string $insertion
 * @return bool True on write success, false on failure.
 */
function add_htaccess($insertion)
{
    require_once(ABSPATH.'/wp-admin/includes/misc.php');
    $htaccess_file = ABSPATH . '.htaccess';
    return insert_with_markers($htaccess_file, 'SVP', (array)$insertion);
}
