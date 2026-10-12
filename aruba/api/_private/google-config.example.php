<?php
// Copy to google-config.php only on Aruba; never publish credentials.
if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    http_response_code(404);
    exit;
}
return [
    'client_id' => '',
    'client_secret' => '',
    'refresh_token' => '',
    'location' => '', // accounts/ACCOUNT_ID/locations/LOCATION_ID (not Place ID/CID).
    'maps_url' => 'https://www.google.com/maps?cid=10979002377613333578',
    'cron_key' => '', // Separate random secret, at least 32 characters.
];
