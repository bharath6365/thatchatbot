const dialogFlow = require('dialogflow');
const mongoose = require('mongoose');

const config = require('../config/keys');
const structJson = require('./structjson');

const Joke = mongoose.model('joke');

const projectID = config.googleProjectID;
const credentials =  {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
}

const sessionClient = new dialogFlow.SessionsClient({
  projectID,
  credentials
});


exports.textQuery = async (incomingText, userID,  parameters = {}) => {
  const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID);
  const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: incomingText,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);

    // Pass this through Handle Action
    responses = await handleAction(responses);

    const result = responses[0].queryResult;

    return result;
}

exports.eventQuery = async (incomingEvent, userID, parameters = {}) => {
  const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID);
  const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: incomingEvent,
          // GRPC Handling of JSON. Remember dialogflow uses GRPC.
          parameters: structJson.jsonToStructProto(parameters),
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);

    // Pass this through Handle Action
    responses = await handleAction(responses);
    const result = responses[0].queryResult;

    return result;
}

// This function will handle actions like contact.
const handleAction = async (responses) => {

  const queryResult = responses[0].queryResult;
  console.log('Query Result is', queryResult);

  switch (queryResult.action) {
    // This is defined on the Dialogflow UI.
    case "joke":
      if (queryResult.allRequiredParamsPresent) {
        await jokeRegistration(queryResult.parameters.fields);
      }
      return responses;
    default:
      return responses;
    
  }

}

const jokeRegistration = async (fields) => {
  try {
    const joke = new Joke({
    // GRPC :/
    name: fields.name.stringValue,
    joke: fields.joke.stringValue,
    date: new Date()
  });
  await joke.save();
  } catch(e) {
    console.error(e);
  }
}