<?php
// Copy to config.php only on the server. Never commit credentials.
if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    http_response_code(404);
    exit;
}
return [
    'user_id' => '',
    'access_token' => '',
    // Instagram Login long-lived token; Facebook Login tokens use another lifecycle.
    'login' => 'instagram',
    'api_version' => 'v23.0',
    'cron_key' => '', // Random secret of at least 32 characters.
];
