<?php

$data_req = [
  "req"=>"mm","currency"=>"pass KES or UGX","tx_ref"=>"xxxx","encryption_key"=>" Your Account Encryption Key",
"amount"=>"amount to withdraw e.g 50000","emailAddress"=>"user-email-address","call_back"=>"your-call-back-url",
"phone"=>"e.g 2567043867575","reason"=>"XXXXX","secrete_key"=>"XXXX"
];

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://silicon-pay.com/api_withdraw',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>json_encode($data_req),
  CURLOPT_HTTPHEADER => array(
    'Content-Type: text/plain'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
