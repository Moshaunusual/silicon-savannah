<?php


$data_req = [
  "req"=>"mm","currency"=>"pass KES or UGX","tx_ref"=>"xxxx","encryption_key"=>" Your Account Encryption Key",
"amount"=>"amount to withdraw e.g 50000","emailAddress"=>"user-email-address","call_back"=>"your-call-back-url",
"phone"=>"e.g 2567043867575","reason"=>"XXXXX","debit_wallet"=>"UGX or KES or USD"
];

// Now Create a Signature that you shall pass in the header of your request.
$secrete_key ="XXXX";
$encryption_key = "XXXXX";
$phone = "254 ... or 256 ...";

$msg	=	hash('sha256',encryption_key).$phone_number;

$signature	= hash_hmac('sha256',$msg, $secrete_key);
  
$headers  = [
  "signature:". $signature,
  'Content-Type: text/plain'
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
  CURLOPT_HTTPHEADER => $headers,
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
