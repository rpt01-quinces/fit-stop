var User = require('../server/db').userModel;
var twilio = require('twilio');
var accountSid = require('../env/config').accountSid;
var authToken = require('../env/config').authToken;

module.exports.reminderWorkerFactory = function() {
    var client = new twilio(accountSid, authToken);
    var numbers = [];

    User.find({}, function(err, users) {
        if(users) {
        users.forEach(function(user) {
            if(user.number) {
            numbers.push(user.number)
            }
        }, this);
        }
        if(numbers.length > 0) {
        numbers.forEach(function(number) {
            console.log(number);
            client.messages.create({
            to: number,
            from:'+13123455304 ',
            body:'Did you workout today?!'
        }, function(error, message) {
            if (!error) {
                console.log('Success! The SID for this SMS message is:');
                console.log(message.sid);
                console.log('Message sent on:');
                console.log(message.dateCreated);
            } else {
                console.log('Oops! There was an error.', error);
            }
        });
        })
        }
    })
};