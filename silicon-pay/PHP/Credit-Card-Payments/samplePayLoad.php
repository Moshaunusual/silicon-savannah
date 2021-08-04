<?php

$data_req = [
    "req"=>"card_payment","currency"=>"e.g USD, UGX or KES","fname"=>"e.g james","lname"=>"e.g Bond","encryption_key"=>"Paste Encryption Key","amount"=>"100",
    "emailAddress"=>"test@gmail.com",'call_back'=>"Notification url. We shall push a webhook/ IPN to this url.","success_url"=>"Success Redirect Url  e.g https://silicon-pay.com/thank-you.php","failure_url"=>"Failure Redirect Url After payment. e.g https://silicon-pay.com/failed-you.php","phone"=>"25670.."
    ,"description"=>"E.g Collections","txRef"=> "Your Unique Transaction Reference. E.g 3747658"
];

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://silicon-pay.com/process_payments',
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