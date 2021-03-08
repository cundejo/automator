This project is to automate tedious and repetitive tasks I found myself doing all the time. 

Right now it has implemented: 
* Check Uruguayan Citizenship coupons

## How it works
You need node 10.x or superior

```bash
npm ci
node index.js 
```

The script will run every 5 minutes and notify you on the console if there is availability to get the appointment. 

If you want to be notified by Slack, [create a Webhook for a channel in your slack](https://api.slack.com/messaging/webhooks#posting_with_webhooks) and put the Webhook URL in `/utils/slack.js` `CHANNEL_AUTOMATOR`
