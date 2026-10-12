<?php
// PHP 7.4+, cURL, no database. Never store access tokens in the public feed.
if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    http_response_code(404);
    exit;
}
function gr_json($value) {
    return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
}
function gr_decode($bytes) {
    return json_decode($bytes, true, 512, JSON_THROW_ON_ERROR);
}
function gr_atomic($file, $bytes) {
    $temp = tempnam(dirname($file), '.gr-');
    if ($temp === false) throw new RuntimeException('write');
    try {
        if (file_put_contents($temp, $bytes) !== strlen($bytes) || !chmod($temp, 0600) || !rename($temp, $file)) {
            throw new RuntimeException('write');
        }
    } finally { if (is_file($temp)) unlink($temp); }
}
function gr_http($url, $headers, $body = null) {
    // Only fixed Google hosts; never follow redirects with OAuth credentials.
    $parts = parse_url($url);
    if (!$parts || ($parts['scheme'] ?? '') !== 'https' ||
        !in_array($parts['host'] ?? '', ['oauth2.googleapis.com', 'mybusiness.googleapis.com'], true) ||
        isset($parts['user']) || isset($parts['pass']) || isset($parts['port'])) {
        throw new RuntimeException('url');
    }
    $bytes = '';
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_FOLLOWLOCATION => false, CURLOPT_CONNECTTIMEOUT => 5, CURLOPT_TIMEOUT => 15,
        CURLOPT_SSL_VERIFYPEER => true, CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS, CURLOPT_HTTPHEADER => $headers,
        CURLOPT_WRITEFUNCTION => function ($handle, $chunk) use (&$bytes) {
            if (strlen($bytes) + strlen($chunk) > 2097152) return 0;
            $bytes .= $chunk;
            return strlen($chunk);
        },
    ]);
    if ($body !== null) {
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
    }
    $ok = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    // Never expose upstream URLs, token responses or error bodies.
    if ($ok === false || $status !== 200) throw new RuntimeException('upstream');
    return gr_decode($bytes);
}
function gr_fetch($config, $http = 'gr_http', $now = null) {
    $now = $now ?? time();
    foreach (['client_id', 'client_secret', 'refresh_token', 'location'] as $key) {
        if (!is_string($config[$key] ?? null) || trim($config[$key]) === '') throw new RuntimeException('configuration');
    }
    if (!preg_match('~^accounts/\d+/locations/\d+$~D', $config['location'])) throw new RuntimeException('location');
    // A fixed public Maps link keeps API credentials and internal resource IDs private.
    $mapsUrl = $config['maps_url'] ?? '';
    if (!preg_match('~^https://www\.google\.com/maps(?:[/?]|$)~D', $mapsUrl)) throw new RuntimeException('maps_url');
    $token = $http('https://oauth2.googleapis.com/token', ['Content-Type: application/x-www-form-urlencoded'], http_build_query([
        'client_id' => $config['client_id'], 'client_secret' => $config['client_secret'],
        'refresh_token' => $config['refresh_token'], 'grant_type' => 'refresh_token',
    ]));
    if (!is_string($token['access_token'] ?? null) || $token['access_token'] === '' || preg_match('/[\r\n]/', $token['access_token'])) throw new RuntimeException('oauth');
    $reviews = []; $seen = []; $pageToken = null; $rating = null; $count = null;
    $deadline = microtime(true) + 45;
    do {
        if (count($seen) >= 100 || microtime(true) > $deadline) throw new RuntimeException('pagination_limit');
        $query = ['pageSize' => 50, 'orderBy' => 'updateTime desc'];
        if ($pageToken !== null) $query['pageToken'] = $pageToken;
        $page = $http('https://mybusiness.googleapis.com/v4/' . $config['location'] . '/reviews?' . http_build_query($query),
            ['Authorization: Bearer ' . $token['access_token']]);
        if (!isset($page['totalReviewCount']) || !is_numeric($page['totalReviewCount']) ||
            !is_array($page['reviews'] ?? [])) throw new RuntimeException('invalid_page');
        $rating = $rating ?? ($page['averageRating'] ?? 0);
        $count = $count ?? (int) $page['totalReviewCount'];
        $reviews = array_merge($reviews, $page['reviews'] ?? []);
        $pageToken = $page['nextPageToken'] ?? null;
        if ($pageToken !== null && $pageToken !== '') {
            if (!is_string($pageToken) || isset($seen[$pageToken])) throw new RuntimeException('pagination');
            $seen[$pageToken] = true;
        } else { $pageToken = null; }
    } while ($pageToken !== null);
    if (!is_numeric($rating) || $rating < 0 || $rating > 5 || $count < 0) throw new RuntimeException('summary');
    $stars = ['ONE'=>1, 'TWO'=>2, 'THREE'=>3, 'FOUR'=>4, 'FIVE'=>5];
    $reviews = array_values(array_filter($reviews, function ($review) use ($stars) {
        return is_string($review['comment'] ?? null) && trim($review['comment']) !== '' &&
            isset($stars[$review['starRating'] ?? '']) && strtotime($review['createTime'] ?? '') !== false;
    }));
    // The API sorts by updateTime; scan every page to find the latest publications.
    usort($reviews, function ($a, $b) { return strtotime($b['createTime']) <=> strtotime($a['createTime']); });
    $items = array_map(function ($review) use ($stars) {
        return ['rating' => $stars[$review['starRating']], 'publishTime' => $review['createTime'],
            'text' => $review['comment'], 'author' => $review['reviewer']['displayName'] ?? 'Utente Google'];
    }, array_slice($reviews, 0, 4));
    return ['version'=>1, 'updatedAt'=>gmdate('c', $now), 'rating'=>(float) $rating,
        'userRatingCount'=>$count, 'mapsUrl'=>$mapsUrl, 'reviews'=>$items];
}
function gr_cache($private, $now = null) {
    $now = $now ?? time();
    $path = $private . '/google-reviews.json';
    if (!is_file($path)) return null;
    try {
        $feed = gr_decode(file_get_contents($path));
        $time = strtotime($feed['updatedAt'] ?? '');
        // Delete expired cache rather than retaining Google content indefinitely.
        if ($time === false || $time > $now + 60 || $now - $time > 86400 || ($feed['version'] ?? null) !== 1) {
            unlink($path); return null;
        }
        return $feed;
    } catch (Throwable $error) { return null; }
}
function gr_update($config, $private, $http = 'gr_http', $now = null) {
    $now = $now ?? time();
    $lock = fopen($private . '/google-update.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) {
        if ($lock) fclose($lock);
        throw new RuntimeException('busy');
    }
    try {
        $cache = gr_cache($private, $now);
        if ($cache && $now - strtotime($cache['updatedAt']) < 300) return $cache;
        $feed = gr_fetch($config, $http, $now);
        gr_atomic($private . '/google-reviews.json', gr_json($feed));
        return $feed;
    } finally { flock($lock, LOCK_UN); fclose($lock); }
}
