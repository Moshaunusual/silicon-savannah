<?php
//Get the user's IP address as $_SERVER["REMOTE_ADDR"]
$ip = $_SERVER["REMOTE_ADDR"];
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://api.siliconsavannah.net/?ip='.$ip,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;