<?php
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    http_response_code(405); header('Allow: GET'); echo '{"ok":false}'; exit;
}
require __DIR__ . '/_private/google-reviews-lib.php';
// Public requests read only the cache; they cannot trigger Google API calls.
$feed = gr_cache(__DIR__ . '/_private');
if ($feed === null) { http_response_code(503); echo '{"ok":false,"code":"not_available"}'; exit; }
echo gr_json($feed);
