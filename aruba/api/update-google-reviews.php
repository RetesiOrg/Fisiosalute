<?php
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('Referrer-Policy: no-referrer');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');
$configFile = __DIR__ . '/_private/google-config.php';
if (!is_file($configFile)) { http_response_code(503); echo '{"ok":false,"code":"not_configured"}'; exit; }
$config = require $configFile;
$key = $_SERVER['HTTP_X_CRON_KEY'] ?? ($_GET['key'] ?? '');
if (PHP_SAPI !== 'cli' && (!is_string($config['cron_key'] ?? null) || strlen($config['cron_key']) < 32 ||
    !is_string($key) || !hash_equals($config['cron_key'], $key))) {
    http_response_code(403); echo '{"ok":false,"code":"forbidden"}'; exit;
}
require __DIR__ . '/_private/google-reviews-lib.php';
try {
    $feed = gr_update($config, __DIR__ . '/_private');
    echo gr_json(['ok'=>true, 'updatedAt'=>$feed['updatedAt'], 'reviews'=>count($feed['reviews'])]);
} catch (Throwable $error) {
    http_response_code($error->getMessage() === 'busy' ? 409 : 502);
    echo '{"ok":false,"code":"update_failed"}';
}
