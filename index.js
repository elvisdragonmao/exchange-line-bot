require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');

const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const events = req.body.events;
    await Promise.all(events.map(handleEvent));
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  const text = event.message.text.toUpperCase();
  
  try {
    const response = await axios.get('https://tw.rter.info/capi.php');
    const rates = response.data;
    
    // Check if the input is a valid currency code
    if (rates[`USD${text}`]) {
      const usdRate = rates[`USD${text}`].Exrate;
      const twdRate = rates.USDTWD.Exrate;
      
      const message = {
        type: 'text',
        text: `1 ${text} = ${(1/usdRate).toFixed(2)} USD\n1 ${text} = ${((1/usdRate) * twdRate).toFixed(2)} TWD`
      };
      
      return client.replyMessage(event.replyToken, message);
    } else {
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Please enter a valid currency code (e.g., EUR, JPY, GBP)'
      });
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'Sorry, there was an error fetching the exchange rates.'
    });
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 