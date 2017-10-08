const CronJob = require('cron').CronJob;
const reminderWorker = require('../workers/reminderWorker');
const moment = require('moment');

module.exports.schedulerFactory = function() {
    new CronJob('00 00 12 * * *', function() {
        console.log('+++Running Send Notifications Worker for ' +
        moment().format());
        reminderWorker.reminderWorkerFactory();
    }, null, true, '');
};