
// load data from friends.js

var friends = require('../data/friends');

// __________

// routing

module.exports = function (app) {

  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function (req, res) {

    var bestFriend = {
      name: '',
      photo: '',
      difference: Infinity
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (totalDifference <= bestFriend.difference) {
        bestFriend.name = currentFriend.name;
        bestFriend.photo = currentFriend.photo;
        bestFriend.difference = totalDifference;
      }
    }

    friends.push(userData);

    res.json(bestFriend);
  });
};