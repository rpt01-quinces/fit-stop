var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var moment = require('moment');


var db = require('./db').mongoose;
var Exercise = require('./db').exerciseModel;
var User = require('./db').userModel;
var ObjectID = require('mongodb').ObjectID;
var spotifyHelpers = require('./helpers/spotifyHelpers.js')
var scheduler = require('./scheduler');


var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

var app = express();

app.listen(process.env.PORT || 3000);

app.use('/public', express.static('client/public'));
app.use('/react', express.static('node_modules/react/dist'));
app.use('/react-dom', express.static('node_modules/react-dom/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/spotify-web-api-js', express.static('node_modules/spotify-web-api-js/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('shhhh, very secret'));
app.use(session());


console.log('server is running');

scheduler.schedulerFactory();

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/', (req,res)=> {
  res.sendFile('index.html', { root: 'client/public'});
});
app.get('/workout', getWorkout);
app.get('/history', getHistory);
app.get('/user/favorites', getUserFavorites);

app.post('/addWorkout', addWorkout);
app.post('/user/favorites', favoriteOrUnfavoriteExercise);
app.post('/login', checkLogin);
app.post('/signup', addSignup);
app.post('/remind', reminder);

app.get('/currentUser', (req, res) => {
  res.send(req.session.user);
});

app.get('/hostLogin', (req, res) => {
  spotifyHelpers.handleHostLogin(req, res);
});

app.get('/callback', (req, res) => {
  spotifyHelpers.redirectAfterLogin(req, res);
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })

});
/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Request Handlers
* * * * * * * * * * * * * * * * * * * * * * * * * * */

function getHistory(req, res) {
  var name = req.query.username || req.session.user;
  User.findOne({username: name}, function(err, data) {
    if(err) {
      console.log('err happened with cooldown retrieval: ' + err);
    } else{
      res.send(data.workoutHistory);
    }
  });
}

function getWorkout(req, res) {
  var returnObj = [];

  Exercise.find({type: 'warmup'}, function(err,data) {
    if(err) {
      console.log('err happened with cooldown retrieval: ' + err);
    } else {
      returnObj.push(data[Math.floor(Math.random()*data.length)]);
      returnObj.push(data[Math.floor(Math.random()*data.length)]);
      returnObj.push(data[Math.floor(Math.random()*data.length)]);

      Exercise.find({type: 'workout'}, function(err,data) {
        if(err) {
          console.log('err happened with cooldown retrieval: ' + err);
        } else {
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);
          returnObj.push(data[Math.floor(Math.random()*data.length)]);

          Exercise.find({type: 'cooldown'}, function(err,data) {
            if(err) {
              console.log('err happened with cooldown retrieval: ' + err);
            } else {
              returnObj.push(data[Math.floor(Math.random()*data.length)]);
              returnObj.push(data[Math.floor(Math.random()*data.length)]);
              returnObj.push(data[Math.floor(Math.random()*data.length)]);

              console.log('exercise data sent succesfully');
              res.status('200').send(returnObj);
            }
          });
        }
      });
    }
  });
}

function getUserFavorites(req, res) {
  User.findOne({username: req.query.username})
  .then(function(user) {
    if (user) { res.json(user.favorites); }
  });
}

function addWorkout(req, res) {
  var name = req.body.username;
  var workoutObj = {};
  workoutObj.currentWorkout = req.body.currentWorkout;
  workoutObj.date = req.body.date;
  workoutObj.lengthOfWorkout = req.body.lengthOfWorkout;

  User.findOne({username: name}, function(err, user) {
    if (err) {
      console.log('err happened with cooldown retrieval: ' + err);
    } else {
      user.workoutHistory.unshift(workoutObj);
      user.save(function(err) {
        if (err) {
          console.log(err + ' error happened!');
        } else {
          console.log('user workouts updated');
          res.status(202).send('user workout history updated');
        }
      });
    }
  });
}

function favoriteOrUnfavoriteExercise(req, res) {
  User.findOne({username: req.body.username})
  .then(function(user) {
    if (user) {
      if (req.body.favorited) {
        var toBeDeletedIndex = user.favorites.indexOf(req.body.exercise.name);
        user.favorites.splice(1, toBeDeletedIndex);
      } else {
        user.favorites.push(req.body.exercise.name);
      }
      return user.save();
    }
  })
  .then(function() {
    res.status(201).send('Favorite/Unfavorite saved')
  });
}

function checkLogin(req, res) {
  var name = req.body.username;
  var pass = req.body.password;

  User.findOne({username:name}, function(err, data) {
    if (err) {
      console.log("Database access error" + err);
    } else {
      if (data) {
        if (bcrypt.compareSync(pass, data.password)=== true) {
          req.session.user = name;
          res.status(200).send('Log in success');
        } else {
          res.status(400).send('Log in attempt failed');
        }
      } else {
        res.status(400).send('Log in attempt failed');
      }
    }
  });
}


function addSignup(req, res) {
  var name = req.body.username;
  var pass = req.body.password;
  var num = req.body.number;
  var hash = bcrypt.hashSync(pass, salt);
  var id = new ObjectID();

  User.find({username: name}, function(err, user) {
    if (err) {
      console.log("Database access error" + err);
    } else {
      if (!user[0]) {
        var newUser = new User({
          _id: id,
          username: name,
          password: hash,
          number: "+1"+num,
          preferences: {}
        });

        newUser.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send('User Created');
          }
        });
      } else {
        res.status(400).send('User exsists');
      }
    }
  });
}

function reminder(req, res) {
  User.find({username: 'dandreaj'}, function(err, user) {
    if(err) {
      console.log("Database error "+err);
    } else {
      console.log(user[0].workoutHistory);
      let today = moment(new Date())
      // let today = moment('Mon Oct 09 2017 20:11:37 GMT-0500 (CDT)');

      console.log('+++++', today);
      for(var i = 0; i< user[0].workoutHistory.length; i++) {
        let date = moment(user[0].workoutHistory[i].date);
        if(today.isSame(date, "d")) {
          console.log("dates are equal");
        } else {
          console.log("dates do not equal");
        }
      }
    }
  })
}


