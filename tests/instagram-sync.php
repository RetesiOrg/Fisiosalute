<?php
require '/api/_private/instagram-lib.php';
function check($value, $message) { if (!$value) throw new RuntimeException($message); }
$config = ['user_id'=>'123','access_token'=>'test-token-123456','login'=>'instagram','api_version'=>'v23.0'];
$items = [
 ['id'=>'1','media_type'=>'IMAGE','media_url'=>'https://s.cdninstagram.com/photo.jpg','permalink'=>'https://www.instagram.com/p/old/','timestamp'=>'2026-09-01T10:00:00+0000','caption'=>'Vecchio'],
 ['id'=>'2','media_type'=>'VIDEO','media_url'=>'https://s.cdninstagram.com/video.mp4','thumbnail_url'=>'https://s.cdninstagram.com/thumb.jpg','permalink'=>'https://www.instagram.com/reel/new/','timestamp'=>'2026-10-05T10:00:00+0000','caption'=>'Nuovo'],
];
$calls=[];
$http=function($url,$token,$limit) use (&$items,&$calls) {
 $calls[]=$url;
 if (strpos($url,'refresh_access_token')!==false) return ig_json(['access_token'=>'renewed-test-token','expires_in'=>5184000]);
 if (strpos($url,'/media?')!==false) return ig_json(['data'=>$items]);
 check($token===null,'Credential sent to CDN');
 check(strpos($url,'.mp4')===false,'Video downloaded instead of thumbnail');
 return file_get_contents('/fixture.jpg');
};
$feed=ig_sync($config,'/api',$http,1000000);
check($feed['posts'][0]['title']==='Nuovo','Sort failed');
check(count($feed['posts'])===2,'Missing posts');
$original=file_get_contents('/api/instagram.json');
$items[0]['media_url']='https://127.0.0.1/private';
try {ig_sync($config,'/api',$http,1000001);throw new LogicException('Unsafe URL accepted');} catch (RuntimeException $e) {check($e->getMessage()==='invalid_image_url','Unexpected failure');}
check(file_get_contents('/api/instagram.json')===$original,'Old feed was overwritten');
$items[0]['media_url']='https://s.cdninstagram.com/photo.jpg';
ig_sync($config,'/api',$http,1700000);
check(strpos(implode('\n',$calls),'refresh_access_token')!==false,'Token not refreshed');
check(ig_decode(file_get_contents('/api/_private/state.json'))['token']==='renewed-test-token','Token not saved');
check(!ig_image_url('https://cdninstagram.com.attacker.test/a'),'Suffix bypass');
check(!ig_image_url('https://user:pass@s.cdninstagram.com/a'),'Credentials in image URL');
echo "PHP sync: sorting, thumbnail, atomic fallback, SSRF checks and refresh passed\n";
