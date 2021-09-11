<?php

require_once("./dotenv.php");
require_once("./mpesa.php");

// Load environment varianbles;
(new DotEnv(__DIR__ . '/.env'))->load();

// STK Push Request
$phone = filter_var($_POST['phone'], FILTER_SANITIZE_NUMBER_INT);
$amount = filter_var($_POST['amount'], FILTER_SANITIZE_NUMBER_INT);

if (empty($phone)) {
	exit;
}

if (empty($amount)) {
	exit;
}

if (is_null($phone)) {
	exit;
}

if (is_null($amount)) {
	exit;
}

$mpesa = new Mpesa();
$phone = '254' . substr($phone, -9);

$BusinessShortCode = getenv('MPESA_STORE_NUMBER');//store number or head office number
$LipaNaMpesaPasskey = getenv('MPESA_PASSKEY');//send to developer email after going live is approved
$TransactionType = 'CustomerPayBillOnline';//if paybill use CustomerPayBillOnline & if till number use CustomerBuyGoodsOnline 
$Amount = $amount;//amount being send
$PartyA = $phone;//customer
$PartyB = getenv('MPESA_TILL_PAYBILL');//paybill or till number
$PhoneNumber = $phone;//customer should be having a 254 prefixed
$CallBackURL = getenv('MPESA_CALLBACK_URL'); //Call Back Url
$AccountReference = getenv('ORG_NAME'); //organisation name
$TransactionDesc = getenv('TRANSACTION_DESC'); //Transaction description
$Remarks = 'Payment';
$callbackJSONData = $mpesa->STKPushSimulation($BusinessShortCode, $LipaNaMpesaPasskey, $TransactionType, $Amount, $PartyA, $PartyB, $PhoneNumber, $CallBackURL, $AccountReference, $TransactionDesc, $Remarks);
$callbackData = json_decode($callbackJSONData);
$responseCode = $callbackData->ResponseCode;
$checkoutRequestID = $callbackData->CheckoutRequestID;

echo $checkoutRequestID;
exit;
