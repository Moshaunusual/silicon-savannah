# Creating of a silicon Pay Account

To accept Mobile Money from our API, Create A silicon Pay Account.
Visit https://silicon-pay.com/ to create the account.

#Initiate a pay Load.
You Notice that in you dashboard there is a long encrypted key on the top. This is your Encryption Key that you shall pass to us.

Please keep this key secrete and dont share it with public.

# Perform a Curl Request.

Initiate a pay Load by calling our Charge End point.

"req"=>"mobile_money". Pass req as mobile_money

"billing_country"=>"uganda". Pass Country and uganda if you are charging a Ugandan Mobile Money Number

# To accept Uganda Mobile Money

Pass UGX as the currency to accept mobile money payments from Uganda

"currency"=>"UGX",

Phone number should include the Country Code (256)

# To accept MPESA

Pass Currency as "KES"
"currency"=>"KES"

# OTHER PARAMETERS

"encryption_key"=>"50d31ae822b70bfdc20e233777c35a320087". Found on top of your dashboard.

"amount"=>"9000", Pass the Amount you are charging the user.

"emailAddress"=>"test@gmail.com". Email Address of the person paying, This is where we shall send the reciept

"phone"=>"256...","narrative"=>1234589. This is the Phone number that is making the payment, Clean it to start with 256

call_back=> "https://your-call-back-url". This is the your Call Back url where we shall push a success webhook.

"narrative" => "7838964kfg" If you would like to use your own transaction reference, Pass to us the Unique trasaction reference as a narrative in the payload. Or else we shall generate a transaction reference.

# Sample Success payload Response

When the initiation of the payload is ok. i.e all the parameters passed are correct, You shall recieve a json response with Status "Successful".

# Sample Response.

{"status":"Successful","message":"A push Notification has been sent to the Customer","narrative":1234589}

N.B Take note of the "Narrative" in this response ans that shall be the unique transaction reference for that payload.

# WebHook

Upon a successful payment by your Customer, A webhook shall be sent to the call back url that you provided.

At this point, You can save/record the transaction as successful. This transaction shall automically reflect in your dashboard.

# Sample Webhook Response

{"status":"successful","amount":5000,"narrative":"fg35746167","network_ref":"llff00e","external_ref":"9697643096","msisdn":"2567086585793"}

# Withdraw API.

You can initiate payouts from our dashboard or using our withdraw API.

# Dashboard withdraws

To Withdraw from the dashboard, Click on Finance->Make a Transfer.
Enter the details required;

Dashboard withdraws only work for UGX wallet and you can only transfter money to MTN Uganda or Airtel Uganda Numbers.

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
