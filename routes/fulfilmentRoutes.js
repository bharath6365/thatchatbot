const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');

const Channel = mongoose.model('channel');
module.exports = (app) => {
  // This route is called everytime an intent is sent to dialogflow from the frontend.
  app.post('/', (req, res) => {
    const agent = new WebhookClient({
      request: req,
      response: res
    });

    // Channel intent handler. For entities agent will get a parameter that the user is searching for.
    async function channel(agent) {
      // Get the channel type.
      const channelType = req.body.queryResult.parameters['channel-type'].toLowerCase();


      const channel = await Channel.findOne({
        type: channelType
      });

      // Dialogflow doesn't support json responses yet.
      agent.add(JSON.stringify(channel))
    }

    // Fallback intent for all other intents.
    function fallback(agent) {
      agent.add('I didnt understand');
      agent.add('Could you repeat that again?');
    }
    // Create a new intent map that will map intents on Dialogflow to our functions.
    const intentMap = new Map();
    intentMap.set('Recommend Channels', channel);
    intentMap.set('Default Fallback Intent', fallback);

    agent.handleRequest(intentMap);
  });
};
