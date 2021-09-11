<?php

	$callbackResponse = file_get_contents('php://input');

	$callbackData = json_decode($callbackResponse);


$Transaction = fopen('live.txt', 'a');
fwrite($Transaction, json_encode($callbackData));
fclose($Transaction);

if(($callbackData->Result->ResultCode) == "2001"){
    $result=[
        "resultType"=>$callbackData->Result->ResultType,
        "resultCode"=>$callbackData->Result->ResultCode,
        "resultDesc"=>$callbackData->Result->ResultDesc,
        "transactionID"=>$callbackData->Result->TransactionID
    ];
}elseif(($callbackData->Result->ResultCode) == "1"){
    $result=[
        "resultType"=>$callbackData->Result->ResultType,
        "resultCode"=>$callbackData->Result->ResultCode,
        "resultDesc"=>$callbackData->Result->ResultDesc,
        "transactionID"=>$callbackData->Result->TransactionID
    ];
}elseif(($callbackData->Result->ResultCode) == "0"){
    $result=[
        "resultType"=>$callbackData->Result->ResultType,
        "resultCode"=>$callbackData->Result->ResultCode,
        "resultDesc"=>$callbackData->Result->ResultDesc,
        "transactionID"=>$callbackData->Result->TransactionID,
        "originatorConversationID"=>$callbackData->Result->OriginatorConversationID,
        "conversationID"=>$callbackData->Result->ConversationID,
        "transactionAmount"=>$callbackData->Result->ResultParameters->ResultParameter[0]->Value,
        "transactionReceipt"=>$callbackData->Result->ResultParameters->ResultParameter[1]->Value,
        "receiverPartyPublicName"=>$callbackData->Result->ResultParameters->ResultParameter[2]->Value,
        "transactionDate"=>$callbackData->Result->ResultParameters->ResultParameter[3]->Value,
        "Utility"=>$callbackData->Result->ResultParameters->ResultParameter[4]->Value,
        "Working"=>$callbackData->Result->ResultParameters->ResultParameter[5]->Value,
        "Registered"=>$callbackData->Result->ResultParameters->ResultParameter[6]->Value,
        "Charges"=>$callbackData->Result->ResultParameters->ResultParameter[7]->Value
    ];
}

$resultType=$resultCode=$resultDesc=$transactionID=$transactionAmount=$transactionReceipt=$receiverPartyPublicName=$transactionDate=$Utility=$Working=$Registered=$Charges="";

    //you can save json_data on database
    $resultType= $result['resultType'];
    $resultCode= $result['resultCode'];
    $resultDesc= $result['resultDesc'];
    $transactionID= $result['transactionID'];
    $transactionAmount= $result['transactionAmount'];
    $transactionReceipt= $result['transactionReceipt'];
    $receiverPartyPublicName= $result['receiverPartyPublicName'];
    $transactionDate= $result['transactionDate'];
    $Utility= $result['Utility'];
    $Working= $result['Working'];
    $Registered= $result['Registered'];
    $Charges= $result['Charges'];


define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'njoka_smsadmin');
define('DB_PASSWORD', 'admin@2021');
define('DB_NAME', 'njoka_sms');
$link = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if($link === false){
    //die("ERROR: Could not connect. " . $link->connect_error);
    // $msg_arr = array("statusCode" => 1);
}

$arr = explode("-", $receiverPartyPublicName, 2);
$phone = "+".$arr[0];
$name = substr($receiverPartyPublicName, strpos($receiverPartyPublicName, "-") + 1);
$transactionDate = date("Y-m-d H:i:s", strtotime($transactionDate));

$sql_save="INSERT INTO b2cmpesa (resulttype, resultcode, resultdesc, transid, transamt, tphone, tname, tdate, tbal, taval, tregistered, b2ccharges)
VALUES('$resultType','$resultCode','$resultDesc','$transactionID','$transactionAmount','$phone','$name','$transactionDate','$Utility','$Working','$Registered','$Charges')";
if(mysqli_query($link, $sql_save)){
   $data="<br> $transactionID saved";
	    $logFile = "demo.json";
    	$log = fopen($logFile, "a");
    	fwrite($log, $data);
    	fclose($log);
}else{
    $data="<br> $transactionID Not saved";
	    $logFile = "log.json";
    	$log = fopen($logFile, "a");
    	fwrite($log, $data);
    	fclose($log);
}
