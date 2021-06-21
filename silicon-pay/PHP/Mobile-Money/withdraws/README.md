# You can withdraw your earning via or our dashboard or using our withdraw API.

# Dashboard withdraws

To Withdraw from the dashboard, Click on Finance->Make a Transfer.
Enter the details required;

Dashboard withdraws only work for UGX wallet and you can only transfter money to MTN Uganda or Airtel Uganda Numbers.

# Withdraw API.

You can initiate payouts from our dashboard or using our withdraw API.

# API withdraws.

Alternatively, u can make payouts using our Withdraw API.

Send the Withdraw load to https://silicon-pay.com/api_withdraw

Request ($req).
To withdraw money to a user mobile money number, pass this as 'mm'
req"=>"mm"

Currency.
You can either withdraw money to an MPESA Account Or Ugandan Mobile Money Account (MTN or AIrtel)
To withdraw to an MPESA account, Pass this value as "KES" or else passs this value as "UGX"

currency"=>"UGX or KES"

Referency. ($tx_ref)
Sometime you may want to pass to us your transaction reference. To do this pass a unique value for every transaction.
"tx_ref"=>"xxxx"

Encryption Key.
Get this value from your silicon pay Dashboard.
"encryption_key"=> "XXXX"

Amount.
This is the amount that you are withdrawing, Pass this value as an Integer e.g 10000
"amount"=>"amount to withdraw e.g 50000"

Email. This is the recipient's email address. We send a reciept to this address
emailAddress"=>"xxx@xxx.xx"

Call Back.
Most times you may wish to get notified of the status of your transaction. We push a webhook to this url when the transfer succeeds.
This response comes in the body of a json Response.
To get this response, use <?php  file_get_contents("php://input") ?>

e.g <?php $body = file_get_contents("php://input") ?>

Phone Number (phone)
This is the recipient's Phone number. Format should be (CCCNNXXXXXXX) e.g 256772123456.
If you are withdrawing to an MPESA number, then the format shoud be 254XXXXXXXX.

"phone"=>"2567XXXXXX"

Reason.
This is the reason for this transfer.
"reason"=>"XXXXX"

Secrete key.
This is a unique withdraw key that was sent to your email address when you registered for the silicon pay Account.
If you never recieved this key or you deleted this email, Kindly Contact us to retrieve your Secrete key.

"secrete_key"=>"XXXX"

# Debit Wallet.

The wallet that you want to debit.
N.B For the transaction to go through, you must have sufficient money on the wallet that you want to debit.
Pass this value as "debit_wallet":"UGX"
