# Creating of a silicon Pay Account

To accept card Payments (VISA, MAster Card, American Express) from our API, Create A silicon Pay Account.
Visit https://silicon-pay.com/ to create the account.

#Initiate a pay Load.
You Notice that in you dashboard there is a long encrypted key on the top. This is your Encryption Key that you shall pass to us.

Please keep this key secrete and dont share it with public.

# Perform a Curl Request.

Initiate a pay Load by calling our Charge End point.

"req"=>"card_payment". Pass req as card_payment

# currency.

if you are billing your customers in a local currency, "UGX or KES" Pass currency as either UGX or KES or else pass this value as USD.

# Mandatory parameters

"encryption_key"=>"Your-Account-Encryption-key". Found on top of your dashboard.

"amount"=>"e.g 9000 ", Pass the Amount you are charging the user. .

"emailAddress"=>"e.g test@gmail.com ". Email Address of the person paying, This is where we shall send the reciept

"phone"=>"E.g 256...",This is the Customers Phone number that is making the payment, Clean it to start with 256

"txRef"=> "e.g 456QuirQ6 ". Unique Transaction Reference for this a payment.If you would like to use your own transaction reference, Pass to us the Unique trasaction reference as a txRef in the payload. Or else we shall generate a transaction reference.

call_back=> "https://your-call-back-url". This is the your Call Back url where we shall push a success webhook.

redirectUrl=> "https://your-sites/thank-you". When a customers Complete the payment, We shall redirect them to your redirectUrl. This can be a thank you page.

# Other Parameters.

"fname" This is your Customers first Name,
"lname" This is your customers Last Name.
"Description" This is the description of the payments, E.g Purchasing a boat

# Sample Success payload Response

When the initiation of the payload is ok. i.e all the parameters passed are correct, You shall recieve a json response with Status "200" and Message "successful".

The recieved json response shall container and payment link .
You are required to load this link in an Iframe or a page or a Modal

# Sample Response.

{"status":"200","message":"successful","link":"https://silicon-pay.com/DirectOrder/56355Erqtt"}

N.B Take note of the "Narrative" in this response ans that shall be the unique transaction reference for that payload.

# WebHook

Upon a successful payment by your Customer, A webhook shall be sent to the call back url that you provided.

At this point, You can save/record the transaction as successful. This transaction shall automically reflect in your dashboard.

# Sample Webhook Response

{"status":"successful","amount":5000,"txRef":"fg35746167","network_ref":"llff00e","currency":"USD","msisdn":"2567086585793"}
