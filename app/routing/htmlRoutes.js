
// 
// dependencies

var path = require('path');

// ___________

// routing

module.exports = function (app) {

  app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/survey.html'));
  });

  // no match
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/home.html'));
  });

};