const axios = require('axios');

const CHANNEL_AUTOMATOR = '';

const postNotification = async (message) => {
  if(!CHANNEL_AUTOMATOR) return;
  
  const body = {
    blocks: [
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `${message}` },
      },
    ],
  };

  await axios.post(CHANNEL_AUTOMATOR, body);
};

module.exports = {
  postNotification,
};
