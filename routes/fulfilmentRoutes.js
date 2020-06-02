const { WebhookClient } = require('dialogflow-fulfillment');
module.exports = (app) => {
  // This route is called everytime an intent is sent to dialogflow from the frontend.
  app.post('/', (req, res) => {
    const agent = new WebhookClient({
      request: req,
      response: res
    }) 

    // Snoopy intent handler. For entities agent will get a parameter that the user is searching for.
    function snoopy(agent) {
      agent.add(`Welcome to snoopy fulfilment`);
    }
    
    // Fallback intent for all other intents.
    function fallback(agent) {
      agent.add('I didnt understand');
      agent.add('Could you repeat that again?');
    }
      // Create a new intent map that will map intents on Dialogflow to our functions.
      const intentMap = new Map();
      intentMap.set('snoopy', snoopy);
      intentMap.set('Default Fallback Intent', fallback);

      agent.handleRequest(intentMap);
    
  })
}