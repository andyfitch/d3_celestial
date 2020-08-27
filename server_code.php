<?php

if(isset($_GET['address'])){

	$address =  urlencode($_GET['address']);
	
	$data =  json_decode(curlget($address), true);
	$ndata = $data['data'][0];
	
	if(!isset($ndata['latitude'])) die('error');
	
	$lat = $ndata['latitude'];
	$lon = $ndata['longitude'];
	
	die('success,'.$lat.','.$lon);


}

function curlget($address_n){
	
	$my_api_key = '5f4d593f01d79cb6117b35acbeb49e0b';
	$theUrl = "http://api.positionstack.com/v1/forward?access_key=".$my_api_key."&query=".$address_n."&limit=1&output=json";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $theUrl);
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$serv_out = curl_exec($ch);
	curl_close($ch);
	//echo $serv_out;
    return $serv_out;

		
}


