# Read me
## How to use it
Copy and paste the code into the browser console on the correct page.

***

## openAllReviews.js

### Where to execute the script
Use the [Completed Reviews](https://support.jotform.com/admn/tools-v2/agent-review-tool?activeTab=review-history) tab on the Agent Review Tool.

### What is going to do
This code will scroll down to load past data. It scrolls down 10 times, enough to get the data of 1-2 months ago. After that, it will return on the console the review links from your team.

### Using it
It's necessary to update the array agents on line 42. Each agent name should be separated by comma.

***

## getMetrics.js

### Where to execute the script
Execute the script on the review page. Example: https://support.jotform.com/admn/tools-v2/agent-review/58591/history

### What is going to do
You should copy and paste and press enter. After that, it will automatically add to a table the metrics of that review. Repeat on each review of your team.

### Using it
After getting the metrics of every review, you can use the following commands:
* copyAllMetrics() -> it will copy the whole table. You can paste it on a spreadsheet easily. To paste with the correct format press CTRL + SHIFT + V
* rankMetrics() -> Create a rank of the metrics.
* ClearStorage() -> Erase all the collected data - if you're going to get the metrics every month, you should use this after all the operations, so next time the table start cleared.
