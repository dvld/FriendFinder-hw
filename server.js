
// dependencies
var express = require('express');

// __________

// config
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// __________

// listener
app.listen(PORT, function () {
  console.log('Server listening on port: ' + PORT);
});