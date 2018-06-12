# wrigley
Google script to update a Slack channel based on a group writing log.

Installation:
1. Create a shared Google Spreadsheet for your writing group (sample sheet to be added soon).
2. Create a Slack channel for your group conversations.
3. Add an application in Slack and enable webhooks. Copy the URL.
4. Use the URL in the script provided.
5. Attach the script as a custom handler for OnEdit() on your Google sheet.
6. Add a word count for one of your users. 
7. If everything works Wrigley should send a message to your channel.
