const CronJob = require('cron').CronJob;
const reminderWorker = require('../workers/reminderWorker');
const moment = require('moment');

module.exports.schedulerFactory = function() {
    new CronJob('05 * * * * *', function() {
        console.log('+++Running Send Notifications Worker for ' +
        moment().format());
        reminderWorker.reminderWorkerFactory();
    }, null, true, '');
};