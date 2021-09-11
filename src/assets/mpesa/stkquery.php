<?php

require_once("./dotenv.php");
require_once("./mpesa.php");

// Load environment varianbles;
(new DotEnv(__DIR__ . '/.env'))->load();

// STK Push Query
$checkoutRequestID = filter_var($_POST['ref'], FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

if (empty($checkoutRequestID)) {
	exit;
}

if (is_null($checkoutRequestID)) {
	exit;
}

$mpesa = new Mpesa();

$environment = getenv('MPESA_ENV');
$businessShortCode = getenv('MPESA_STORE_NUMBER');
$LipaNaMpesaPasskey = getenv('MPESA_PASSKEY');
$timestamp = '20'.date("ymdhis");

$password = base64_encode($businessShortCode.$LipaNaMpesaPasskey.$timestamp);

$STKPushRequestStatus = $mpesa->STKPushQuery($environment,$checkoutRequestID,$businessShortCode,$password,$timestamp);

echo $STKPushRequestStatus;
exit;