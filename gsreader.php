<?php
require __DIR__ . '/vendor/autoload.php';
$response_url = $_POST["response_url"];
$response = ["response_type"=>"in_channel", "text"=>"Checking writing log, please wait..."];
header("Content-Type: application/json");

/*
 * We need to get a Google_Client object first to handle auth and api calls, etc.
 */
$client = new \Google_Client();
$client->setApplicationName('My PHP App');
$client->setDeveloperKey("redacted-add-your-own-here");
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
$client->setAuthConfig(__DIR__ . '/swc-creds.json');

/*
 * With the Google_Client we can get a Google_Service_Sheets service object to interact with sheets
 */
$sheets = new \Google_Service_Sheets($client);

/*
 * To read data from a sheet we need the spreadsheet ID and the range of data we want to retrieve.
 * Range is defined using A1 notation, see https://developers.google.com/sheets/api/guides/concepts#a1_notation
 */

// The first row contains the column titles, so lets start pulling data from row 2
$currentRow = 2;

// The range of A2:H will get columns A through H and all rows starting from row 2
$writerName = ucfirst($_POST["text"]);
$spreadsheetId = "add-spreadsheet-id-here";
$range = 'A2:H';
$rows = $sheets->spreadsheets_values->get($spreadsheetId, $range, ['majorDimension' => 'ROWS']);
if (isset($rows['values'])) 
	{
    foreach ($rows['values'] as $row) 
		{
        /*
         * If first column is empty, consider it an empty row and skip (this is just for example)
         */
        if (empty($row[0])) {
            break;
		}

        if ($row[0] == $writerName) //only show data for that user
			{
			$data = $row[0]." just reached *".$row[1]."* words in *".$row[2]."* minutes!\n";
			break;
			}
		else
			{
	        $data .= $row[0]." just reached *".$row[1]."* words in *".$row[2]."* minutes!\n";
		    $currentRow++;
			}
    }
}

$message = array (
   'response_type' => 'in_channel',
   'text' => $data
    );

echo json_encode ($message);

?>