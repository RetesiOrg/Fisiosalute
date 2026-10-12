<?php
require dirname(__DIR__) . '/aruba/api/_private/google-reviews-lib.php';
function check($value, $message) { if (!$value) throw new RuntimeException($message); }
$directory = sys_get_temp_dir() . '/gr-test-' . bin2hex(random_bytes(6));
mkdir($directory, 0700);
$config = ['client_id'=>'test-client', 'client_secret'=>'test-secret', 'refresh_token'=>'test-refresh',
    'location'=>'accounts/123/locations/456', 'maps_url'=>'https://www.google.com/maps?cid=10979002377613333578'];
$calls = [];
$mode = 'normal';
$http = function ($url, $headers, $body = null) use (&$calls, &$mode) {
    $calls[] = $url;
    if (strpos($url, 'oauth2') !== false) {
        check(strpos($body, 'grant_type=refresh_token') !== false, 'Not refresh OAuth');
        return ['access_token'=>'test-access'];
    }
    check($headers === ['Authorization: Bearer test-access'], 'Missing token header');
    if ($mode === 'failure') throw new RuntimeException('upstream');
    if ($mode === 'empty') return ['totalReviewCount'=>0, 'averageRating'=>0, 'reviews'=>[]];
    $old = ['starRating'=>'FIVE', 'createTime'=>'2025-01-01T00:00:00Z', 'comment'=>'Old edited review', 'reviewer'=>['displayName'=>'Old']];
    $new = ['starRating'=>'ONE', 'createTime'=>'2026-10-09T00:00:00Z', 'comment'=>'<img src=x onerror=alert(1)>', 'reviewer'=>['displayName'=>'Recent']];
    if (strpos($url, 'pageToken=next') !== false) return ['totalReviewCount'=>7, 'averageRating'=>4.2, 'reviews'=>[$new]];
    return ['totalReviewCount'=>7, 'averageRating'=>4.2, 'reviews'=>[$old, ['starRating'=>'FIVE','createTime'=>'2026-10-10','comment'=>'']], 'nextPageToken'=>'next'];
};
try {
    $feed = gr_update($config, $directory, $http, 1000000);
    check($feed['reviews'][0]['author'] === 'Recent', 'Publication order across pages failed');
    check($feed['reviews'][0]['rating'] === 1, 'Negative review was excluded');
    check(count($feed['reviews']) === 2 && $feed['userRatingCount'] === 7, 'Text filter or total count failed');
    $bytes = file_get_contents($directory . '/google-reviews.json');
    foreach (['test-client', 'test-secret', 'test-refresh', 'test-access', 'accounts/123'] as $secret) check(strpos($bytes, $secret) === false, 'Secret in cache');
    $n = count($calls);
    gr_update($config, $directory, $http, 1000010);
    check(count($calls) === $n, 'Recent cache made another API call');
    $mode = 'failure';
    try { gr_update($config, $directory, $http, 1000400); throw new LogicException('Expected failure'); }
    catch (RuntimeException $e) { check($e->getMessage() === 'upstream', 'Unexpected failure'); }
    check(file_get_contents($directory . '/google-reviews.json') === $bytes, 'Failure overwrote cache');
    check(gr_cache($directory, 1086401) === null && !is_file($directory . '/google-reviews.json'), 'Expired cache not removed');
    $mode = 'empty';
    $feed = gr_update($config, $directory, $http, 1100000);
    check($feed['reviews'] === [] && $feed['userRatingCount'] === 0, 'Deleted reviews not cleared');
    $config['location'] = 'https://attacker.test/';
    try { gr_fetch($config, $http); throw new LogicException('Invalid location accepted'); }
    catch (RuntimeException $e) { check($e->getMessage() === 'location', 'Unexpected validation failure'); }
    echo "PHP reviews: pagination, ordering, negative reviews, cache, secrets, failure and deletion passed\n";
} finally {
    foreach (glob($directory . '/*') as $file) unlink($file);
    rmdir($directory);
}
