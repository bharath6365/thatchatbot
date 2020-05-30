const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/keys');
const app = express();

// Mongoose Connection.
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true
})

// Register models
require('./models/User');

app.use(bodyParser.json());

// Inject the dependency of the app.
require('./routes/dialogflowRoutes')(app);
app.get('/', (req, res) => {
  res.json({
    'message': 'Hi There'
  })
})





app.listen(process.env.PORT || 5000);