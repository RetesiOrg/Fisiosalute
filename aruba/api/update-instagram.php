<?php
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('Referrer-Policy: no-referrer');
header('X-Robots-Tag: noindex');
$configFile = __DIR__ . '/_private/config.php';
if (!is_file($configFile)) { http_response_code(503); echo '{"ok":false,"code":"not_configured"}'; exit; }
$config = require $configFile;
$key = $_SERVER['HTTP_X_CRON_KEY'] ?? ($_GET['key'] ?? '');
if (PHP_SAPI !== 'cli' && (!is_string($config['cron_key'] ?? null) || strlen($config['cron_key']) < 32 || !is_string($key) || !hash_equals($config['cron_key'], $key))) {
    http_response_code(403); echo '{"ok":false,"code":"forbidden"}'; exit;
}
require __DIR__ . '/_private/instagram-lib.php';
$lock = fopen(__DIR__ . '/_private/update.lock', 'c');
if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) { http_response_code(409); echo '{"ok":false,"code":"busy"}'; exit; }
try {
    $state = is_file(__DIR__ . '/_private/state.json') ? ig_decode(file_get_contents(__DIR__ . '/_private/state.json')) : [];
    if (time() - ($state['last_success'] ?? 0) < 300) {
        echo '{"ok":true,"code":"recently_updated"}';
    } else {
        $feed = ig_sync($config, __DIR__);
        echo ig_json(['ok' => true, 'updatedAt' => $feed['updatedAt'], 'posts' => count($feed['posts'])]);
    }
} catch (Throwable $error) {
    http_response_code(502);
    echo '{"ok":false,"code":"update_failed"}';
} finally { flock($lock, LOCK_UN); fclose($lock); }
