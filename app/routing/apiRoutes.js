
// load data from friends.js

var friends = require('../data/friends');

// __________

// routing

module.exports = function (app) {

  // gets json data
  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  // user submitted form data pushed to js array
  app.post('/api/friends', function (req, res) {

    // best overall match object
    var bestFriend = {
      name: '',
      photo: '',
      difference: Infinity
    };

    // parse user results from survey POST
    var userData = req.body;
    var userScores = userData.scores;

    // difference between user's score and users in database
    var totalDifference;

    // loop throough all possibilities in the database
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // loop through all scores
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // calculate difference between scores and sum into totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      // if the sum of differences is less than the differences of current match
      if (totalDifference <= bestFriend.difference) {

        // reset bestFriend to the new match
        bestFriend.name = currentFriend.name;
        bestFriend.photo = currentFriend.photo;
        bestFriend.difference = totalDifference;
      }
    }

    // save the user's data to the database (after checking for matches so the user is not returned as their own best match)
    friends.push(userData);

    // return user's new friend's json data
    res.json(bestFriend);
  });
};