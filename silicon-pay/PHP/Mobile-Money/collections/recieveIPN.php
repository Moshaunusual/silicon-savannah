<?php

//lets recieve the body of the message
$body = file_get_contents("php://input");
$dataObject = json_decode($body,true);

$amount = $dataObject["amount"]; //This is the amount paid by the customer
$reference = $dataObject["txRef"]; // This is the transaction reference that you passed to us. 

if($dataObject["status"] =="successful"){
    // Money has been successfully deducted from the customer and has been recieved. 
    // Transaction is successful. At this point you may insert the user data into a database. 

}
?>