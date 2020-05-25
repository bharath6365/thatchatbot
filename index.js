const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Inject the dependency of the app.
require('./routes/dialogflowRoutes')(app);
app.get('/', (req, res) => {
  res.json({
    'message': 'Hi There'
  })
})





app.listen(process.env.PORT || 5000);