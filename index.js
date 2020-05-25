const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    'message': 'Hi There'
  })
})

app.listen(process.env.PORT || 5000);