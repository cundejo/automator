const { setIntervalAsync } = require('set-interval-async/dynamic');

const checkAvailability = require('./parsers/checkCitizenshipAvalabilityUy');

setIntervalAsync(async () => {
  await checkAvailability();
}, 300000);
