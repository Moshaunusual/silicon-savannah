<?php

//lets recieve the body of the message
$body = file_get_contents("php://input");
$dataObject = json_decode($body,true);

$amount = $dataObject["amount"]; //This is the amount paid by the customer
$reference = $dataObject["txRef"]; // This is the transaction reference that you passed to us. 

if($dataObject["status"] =="successful"){
    // User has successfully recieved the funds. 
    //Transaction is successful. At this point you may insert the user data into a database. 
}
?>