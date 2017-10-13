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
            User.find({username: user.username}, function(err, user) {
                if(err) {
                  console.log("Database error "+err);
                } else {
                  console.log(user[0].workoutHistory);
                  let today = moment(new Date())
                  // let today = moment('Mon Oct 09 2017 20:11:37 GMT-0500 (CDT)');
                  for(var i = 0; i< user[0].workoutHistory.length; i++) {
                    let date = moment(user[0].workoutHistory[i].date);
                    if(today.isSame(date, "d")) {
                      console.log("dates are equal");
                    } else {
                        if(user.number) {
                            numbers.push(user.number)
                        }
                    }
                  }
                }
            })
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