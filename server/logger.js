/* eslint-env browser */
const AirbrakeClient = require('airbrake-js');

const airbrake = new AirbrakeClient({
  projectId: process.env.AIRBRAKE_ID || 123,
  projectKey: process.env.AIRBRAKE_KEY || 'abc'
});

const logger = {
  error: (error, ...info) =>
    airbrake.notify({
      error,
      params: { info }
    }),
  log: (...args) => Promise.resolve(console.log(...args)),
  info: (...args) => Promise.resolve(console.info(...args))
};

module.exports = logger;
