<?php
/**
 * This file creates a static page for crawlers such as Facebook or Twitter bots that cannot evaluate JavaScript.
 *
 * For a full explanation see https://github.com/michaelbromley/angular-social-demo
 */

$API_URL = 'http://' . $_SERVER['SERVER_NAME'] . '/' . $_GET['slug'] . '?json=1';

$jsonData = getData($API_URL);
makePage($jsonData);

function getData($API_URL)
{
    $rawData = file_get_contents($API_URL);
    return json_decode($rawData);
}

function makePage($data)
{
    global $API_URL;

    if (chop($API_URL, "?json=1") === 'http://' . $_SERVER['SERVER_NAME'] . '/') {
        $pageUrl = 'http://' . $_SERVER['SERVER_NAME'] . '/';
        $pageTitle = 'Sam Venn Photography';
        $metaDescription = 'Photographer from Sydney';
        $pageContent = '';
    }
    elseif (isset($data->post)) {
        $pageUrl = $data->post->url;
        $pageTitle = $data->post->title;
        $metaDescription = strlen(substr(strip_tags($data->post->excerpt), 0, 155)) !== 0 ? substr(strip_tags($data->page->excerpt), 0, 155) : 'Photographer from Sydney';
        $pageContent = $data->post->content;
    }
    else {
        $pageUrl = $data->page->url;
        $pageTitle = $data->page->title;
        $metaDescription = strlen(substr(strip_tags($data->page->excerpt), 0, 155)) !== 0 ? substr(strip_tags($data->page->excerpt), 0, 155) : 'Photographer from Sydney';
        $pageContent = $data->page->content;
    }
    $thumbUrl = isset($data->post->thumbnail_images) ? $data->post->thumbnail_images->thumbnail->url : 'http://' . $_SERVER['SERVER_NAME'] . '/wp-content/themes/SVPWebsite/img/SVP_Logo.png';
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title><?php echo $pageTitle; ?></title>
        <meta property="description" content="<?php echo $metaDescription; ?>"/>

        <!-- Twitter summary card metadata -->
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:title" content="<?php echo $pageTitle; ?>"/>
        <meta property="twitter:text:description" content="<?php echo $metaDescription ?>"/>
        <meta property="twitter:url" content="<?php echo $pageUrl; ?>"/>
        <meta property="twitter:image" content="<?php echo $thumbUrl; ?>"/>

        <!-- Facebook, Pinterest, Google Plus and others make use of open graph metadata -->
        <meta property="og:title" content="<?php echo $pageTitle; ?>"/>
        <meta property="og:description" content="<?php echo $metaDescription; ?>"/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content="<?php echo $pageUrl; ?>"/>
            <meta property="og:image" content="<?php echo $thumbUrl; ?>"/>

    </head>
    <body>
        <h1 class="page-header"><?php echo $pageTitle; ?></h1>

        <div class="post-body">
            <?php echo $pageContent; ?>
        </div>
    </body>
    </html>
    <?php
}