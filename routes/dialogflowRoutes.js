
const textQuery = require('../services/chatbot').textQuery;
const eventQuery = require('../services/chatbot').eventQuery;

module.exports = (app) => {
  app.post('/api/df_text_query', async (req, res) => {
    const result = await textQuery(req.body.text, req.body.parameters);
    res.send(result);
  });

  app.post('/api/df_event_query', async (req, res) => {
    const result = await eventQuery(req.body.event, req.body.parameters);
    res.send(result);
  });
};
