const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/keys');
const app = express();
const path = require('path');

// Mongoose Connection.
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true
})

// Register models
require('./models/User');
require('./models/Channel');

app.use(bodyParser.json());

// Inject the dependency of the app.
require('./routes/dialogflowRoutes')(app);
require('./routes/fulfilmentRoutes')(app);

// Frontend routing.
if (process.env.NODE_ENV === 'production') {
  // Css, JS
  app.use(express.static('client/build'));
  
  // HTML
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  })
}

app.listen(process.env.PORT || 5000);