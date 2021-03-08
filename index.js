const { setIntervalAsync } = require('set-interval-async/dynamic');

const checkAvailability = require('./parsers/checkCitizenshipAvalabilityUy');

console.log('Automator running...');

setIntervalAsync(async () => {
  await checkAvailability();
}, 300000);
