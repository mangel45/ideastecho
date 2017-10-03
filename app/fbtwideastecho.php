<?php
/**
 * This file creates a static page for crawlers such as Facebook or Twitter bots that cannot evaluate JavaScript.
 *
 */
$API_ROOT = "http://api.ideastecho.org/";
$SITE_ROOT = "http://ideastecho.apex.la/";
$jsonData = getData($API_ROOT);
makePage($jsonData, $SITE_ROOT);
function getData($siteRoot) {
    $id = ctype_digit($_GET['id']) ? $_GET['id'] : 1;
    $rawData = file_get_contents($siteRoot.'usuarios/ProyectoDetail/'.$id);
    return json_decode($rawData);
}
function makePage($data, $siteRoot) {
    $imageUrl = $data->imagencausa_path;
    //$pageUrl = $siteRoot . "proyecto/" . $data->proyectoid;
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Ideas TECHO | <?php echo $data->nombreproyecto; ?></title>

        <!-- Twitter summary card metadata -->
        <meta property="twitter:card" content="summary" />
        <!--<meta property="twitter:site" content="@michlbrmly" />-->
        <meta property="twitter:title" content="<?php echo $data->nombreproyecto; ?>" />
        <meta property="twitter:description" content="<?php echo $data->porqueimportante; ?>" />
        <meta property="twitter:image" content="<?php echo $imageUrl; ?>" />
        <!--<meta property="twitter:url" content="<?php echo $pageUrl; ?>" />-->

        <!-- Facebook, Pinterest, Google Plus and others make use of open graph metadata -->
        <meta property="og:title" content="<?php echo $data->nombreproyecto; ?>" />
        <meta property="og:description" content="<?php echo $data->porqueimportante; ?>" />
        <meta property="og:image" content="<?php echo $imageUrl; ?>" />
        <meta property="og:type" content="proyecto" />
        <meta property="og:site_name" content="Ideas TECHO" />
        <!--<meta property="og:url" content="<?php echo $pageUrl; ?>" />-->

    </head>
    <body>
    <h2><?php echo $data->nombreproyecto; ?></h2>
    <p><?php echo $data->porqueimportante; ?></p>
    <img src="<?php echo $imageUrl; ?>">
    </body>
    </html>
<?php
}
?>