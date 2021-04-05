<?php

$data = array(
  "req"=>"mobile_money","billing_country"=>"uganda","currency"=>"UGX","encryption_key"=>"50d31ae822b70bfdc20e233777c35a320087",
  "amount"=>"9000","emailAddress"=>"test@gmail.com","phone"=>"256...","narrative"=>1234589,
  "call_back"=>"https://your-call-back-url"
);
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://payments.siliconsavannah.net/process_payments',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>json_encode($data),
  CURLOPT_HTTPHEADER => array(
    'Content-Type: text/plain',
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
?>