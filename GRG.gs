/**
 * @author Rudy McDaniel
 * @revision 0.0.2
 *
 * 10th June 2018
 * Purpose - send a slack message informing users of writing log updates (for our games research group summer writing challenge)
 * Based on original code from Chris Tate-Davies, see http://blog.tatedavies.com/2016/05/10/posting-slack-message-on-google-docs-spreadsheet-cell-update/
**/


function writingUpdate(event) 
{
  // get the spreadsheet
  var grg_spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scoresheet");
  Logger.log("Someone edited the sheet!");
  
  // get sheets and range
  var grg_sheet = event.source.getActiveSheet();
  var grg_range = event.source.getActiveRange();
  
  // get cell
  var active_cell = grg_sheet.getActiveCell();
  var active_row = active_cell.getRow();
  var active_column = active_cell.getColumn();

  // If header row then exit
  if (active_row < 2) return;
 
  // if not the word count column (which is #3 on the individual sheets) get out
  if (active_column != 3) return;

  // get the writer's name
  var user_range = grg_sheet.getRange(1, 2);
  var user_content = user_range.getValue();
  
  // get the total word count
  var total_range = grg_sheet.getRange(2, 2);
  var wc_total = total_range.getValue().toLocaleString();  

  // get the writer's time logged
  var time_range = grg_sheet.getRange(active_row, 2);
  var time_logged = time_range.getValue();
  
  //get the word count
  var wc_range = grg_sheet.getRange(active_row, 3);
  var wc_content = wc_range.getValue();  
  
  // if its nothing then lets not bother (they're probably deleting stuff)
  if (wc_content == "") return;
 
  //the url to post to (main writing challenge slack channel)
  var slack_url = "redacted-add-your-own-slack-channel-here";

  //generate the payload text object
  var payload;
  
  if (time_logged == "") 
  {
  payload = { "text" : ":thumbsup: *" + user_content + "* added *" + wc_content + "* words for a total of *" + wc_total + "* words!" };    
  }
    
  else 
  {  
  payload = { "text" : ":thumbsup: *" + user_content + "* wrote for *" + time_logged +"* minutes and added *" + wc_content + "* words for a total of *" + wc_total + "* words!" };
  }
  
  //the URL payload
  var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(payload),
    "muteHttpExceptions" : true
  };
  
  //send that bugger
  var response = UrlFetchApp.fetch(slack_url, options);
  
}