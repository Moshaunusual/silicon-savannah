# Creating of a silicon Pay Account

To accept Mobile Money from our API, Create A silicon Pay Account.
Visit https://payments.siliconsavannah.net/ to create the account.

#Initiate a pay Load.
You Notice that in you dashboard there is a long encrypted key on the top. This is your Encryption Key that you shall pass to us.

Please keep this key secrete and dont share it with public.

# Perform a Curl Request.

Initiate a pay Load by calling our Charge End point.

"req"=>"mobile_money". Pass req as mobile_money

"billing_country"=>"uganda". Pass Country and uganda if you are charging a Ugandan Mobile Money Number

"currency"=>"UGX". Pass UGX as the currency to accept mobile money payments from Uganda

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
