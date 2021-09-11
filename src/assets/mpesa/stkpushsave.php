<?php
require_once("./mpesa.php");
$mpesa = new Mpesa();
$callbackData = $mpesa->getDataFromCallback();

$callbackData = json_decode($callbackData);

$result=[
    "resultDesc"=>$callbackData->Body->stkCallback->ResultDesc,
    "resultCode"=>$callbackData->Body->stkCallback->ResultCode,
    "merchantRequestID"=>$callbackData->Body->stkCallback->MerchantRequestID,
    "checkoutRequestID"=>$callbackData->Body->stkCallback->CheckoutRequestID,
    "amount"=>$callbackData->Body->stkCallback->CallbackMetadata->Item[0]->Value,
    "mpesaReceiptNumber"=>$callbackData->Body->stkCallback->CallbackMetadata->Item[1]->Value,
    "transactionDate"=>$callbackData->Body->stkCallback->CallbackMetadata->Item[3]->Value,
    "phoneNumber"=>$callbackData->Body->stkCallback->CallbackMetadata->Item[4]->Value
];

//you can save json_data on database
$PhoneNumber= $result['phoneNumber'];
$Amount= $result['amount'];
$ResultDesc= $result['resultDesc'];
$ResultCode= $result['resultCode'];
$MpesaReceiptNumber= $result['mpesaReceiptNumber'];
$TransactionDate= $result['transactionDate'];

if ($MpesaReceiptNumber==NULL || $MpesaReceiptNumber="") {
  $MpesaReceiptNumber=$TransactionDate;  
}

// $Transaction = fopen('Transaction.txt', 'a');
// fwrite($Transaction, json_encode($MpesaReceiptNumber));
// fclose($Transaction);

//determine if to save to database
if ($ResultCode == 0)
{
    // start Save STK Push Response into the Database.
    $DATABASE_HOST = 'localhost';
    $DATABASE_USER = 'root';
    $DATABASE_PASS = '';
    $DATABASE_NAME = 'mpesaAPI';


    // Try and connect using the info above.
    $con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
    if (mysqli_connect_errno())
    {
    exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }




    // Username doesnt exists, insert new account
    if ($stmt = $con->prepare('INSERT INTO mpesa (TransID, TransTime, TransAmount, MSISDN) VALUES (?,?,?,?)'))
    {


        $stmt->bind_param($MpesaReceiptNumber,$TransactionDate,$PhoneNumber,$Amount,$PhoneNumber);
        $stmt->execute();

    }

}

$mpesa->finishTransaction();
?>
