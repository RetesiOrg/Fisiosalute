<?php
// PHP 7.4+, no database or Composer required.
if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    http_response_code(404);
    exit;
}
function ig_atomic($file, $bytes, $mode = 0644) {
    $temp = tempnam(dirname($file), '.ig-');
    if ($temp === false) throw new RuntimeException('write');
    try {
        if (file_put_contents($temp, $bytes) !== strlen($bytes) || !chmod($temp, $mode) || !rename($temp, $file)) {
            throw new RuntimeException('write');
        }
    } finally { if (is_file($temp)) unlink($temp); }
}
function ig_json($value) {
    return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
}
function ig_decode($bytes) {
    return json_decode($bytes, true, 512, JSON_THROW_ON_ERROR);
}
function ig_image_url($url) {
    $parts = parse_url($url);
    if (!$parts || ($parts['scheme'] ?? '') !== 'https' || isset($parts['user']) || isset($parts['pass']) || (isset($parts['port']) && $parts['port'] !== 443)) return false;
    $host = strtolower($parts['host'] ?? '');
    return (bool) preg_match('/(?:^|\.)(?:cdninstagram\.com|fbcdn\.net)$/D', $host);
}
function ig_http($url, $token = null, $limit = 1048576) {
    if (!function_exists('curl_init')) throw new RuntimeException('curl_missing');
    $curl = curl_init($url);
    $bytes = '';
    curl_setopt_array($curl, [
        CURLOPT_FOLLOWLOCATION => false, CURLOPT_CONNECTTIMEOUT => 10, CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true, CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_HTTPHEADER => $token ? ['Authorization: Bearer ' . $token] : [],
        CURLOPT_WRITEFUNCTION => function ($handle, $chunk) use (&$bytes, $limit) {
            if (strlen($bytes) + strlen($chunk) > $limit) return 0;
            $bytes .= $chunk;
            return strlen($chunk);
        },
    ]);
    $ok = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    // Do not expose Meta responses, URLs, tokens or cURL errors.
    if ($ok === false || $status !== 200) throw new RuntimeException('upstream');
    return $bytes;
}
function ig_sync($config, $directory, $http = 'ig_http', $now = null) {
    $now = $now ?? time();
    $private = $directory . '/_private';
    $statePath = $private . '/state.json';
    $state = is_file($statePath) ? ig_decode(file_get_contents($statePath)) : [];
    if (($state['user_id'] ?? ($config['user_id'] ?? '')) !== ($config['user_id'] ?? '')) $state = [];
    $state['user_id'] = $config['user_id'] ?? '';
    $token = $state['token'] ?? ($config['access_token'] ?? '');
    $login = $config['login'] ?? 'instagram';
    if (!preg_match('/^\d+$/D', $config['user_id'] ?? '') || !is_string($token) || strlen($token) < 12 || !in_array($login, ['instagram', 'facebook'], true) || !preg_match('/^v\d+\.\d+$/D', $config['api_version'] ?? '')) {
        throw new RuntimeException('configuration');
    }
    // Refresh only Instagram Login tokens, once a week after the first successful sync.
    if ($login === 'instagram' && isset($state['token_checked']) && $now - $state['token_checked'] > 7 * 86400) {
        $renewed = ig_decode($http('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' . rawurlencode($token), null, 1048576));
        if (empty($renewed['access_token']) || empty($renewed['expires_in'])) throw new RuntimeException('refresh');
        $token = $renewed['access_token'];
        $state['token'] = $token;
        $state['token_checked'] = $now;
        $state['expires_at'] = $now + (int) $renewed['expires_in'];
        ig_atomic($statePath, ig_json($state), 0600);
    }
    $host = $login === 'instagram' ? 'graph.instagram.com' : 'graph.facebook.com';
    $query = http_build_query(['fields' => 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp', 'limit' => 25]);
    $payload = ig_decode($http('https://' . $host . '/' . $config['api_version'] . '/' . $config['user_id'] . '/media?' . $query, $token, 1048576));
    $items = array_filter($payload['data'] ?? [], function ($p) {
        return in_array($p['media_type'] ?? '', ['IMAGE', 'CAROUSEL_ALBUM', 'VIDEO'], true) && !empty($p['timestamp']);
    });
    usort($items, function ($a, $b) { return strcmp($b['timestamp'], $a['timestamp']); });
    $items = array_slice($items, 0, 2);
    if (!$items) throw new RuntimeException('empty_feed');
    $images = $directory . '/instagram-images';
    if (!is_dir($images) && !mkdir($images, 0755, true)) throw new RuntimeException('write');
    $posts = [];
    foreach ($items as $post) {
        if (!preg_match('/^\d+$/D', $post['id'] ?? '') || !preg_match('~^https://(?:www\.)?instagram\.com/(?:[^/]+/)?(?:p|reel)/[A-Za-z0-9_-]+/?$~D', $post['permalink'] ?? '')) throw new RuntimeException('invalid_post');
        $imageUrl = ($post['media_type'] === 'VIDEO') ? ($post['thumbnail_url'] ?? '') : ($post['media_url'] ?? '');
        if (!ig_image_url($imageUrl)) throw new RuntimeException('invalid_image_url');
        $image = $http($imageUrl, null, 8388608);
        $info = @getimagesizefromstring($image);
        $extensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
        if (!$info || !isset($extensions[$info['mime']]) || $info[0] * $info[1] > 40000000) throw new RuntimeException('invalid_image');
        $name = $post['id'] . '-' . substr(hash('sha256', $image), 0, 16) . '.' . $extensions[$info['mime']];
        ig_atomic($images . '/' . $name, $image);
        $date = new DateTimeImmutable($post['timestamp']);
        $date = $date->setTimezone(new DateTimeZone('Europe/Rome'));
        $title = trim(explode("\n", $post['caption'] ?? '')[0]);
        $letters = preg_split('//u', $title, -1, PREG_SPLIT_NO_EMPTY);
        if (count($letters) > 240) $title = implode('', array_slice($letters, 0, 239)) . '…';
        $posts[] = ['url' => $post['permalink'], 'image' => 'api/instagram-images/' . $name,
            'title' => $title ?: 'Una novità da FisioSalute', 'date' => $date->format('Y-m-d'),
            'width' => $info[0], 'height' => $info[1]];
    }
    $feed = ['updatedAt' => gmdate('c', $now), 'posts' => $posts];
    // Commit the feed only when both photos have been saved. Keep the old feed on any failure.
    ig_atomic($directory . '/instagram.json', ig_json($feed));
    $state['token_checked'] = $state['token_checked'] ?? $now;
    $state['last_success'] = $now;
    ig_atomic($statePath, ig_json($state), 0600);
    return $feed;
}
